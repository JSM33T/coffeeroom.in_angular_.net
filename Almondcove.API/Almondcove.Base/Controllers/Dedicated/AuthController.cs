using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Almondcove.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<AuthController> logger, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository,IUserService userService,IMailingService mailingService) : FoundationController(config, logger, httpContextAccessor)
    {
        private readonly IUserRepository _userRepo = userRepository;
        private readonly IUserService _userService = userService;
        private readonly IMailingService _mail= mailingService;

        private static readonly Random _random = new Random();
        private IOptionsMonitor<AlmondcoveConfig> _config = config;

        [HttpPost("signup")]
        [AllowAnonymous]
        #region SIGNUP CONTROLLER
        public async Task<IActionResult> SignUp([FromBody] UserAddRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;

            string message = "Error";
            List<string> errors = [];

            #region MAP UserAddRequest -> User
            var user = new Entities.Dedicated.User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Username = request.Username,
                Email = request.Email,
                PasswordHash = request.Password,
                OTP = _random.Next(1000, 9999)

            };
            #endregion

            return await ExecuteActionAsync(async () =>
            {
                int res = await _userRepo.SignUpUser(user);

                //message = res switch
                //{
                //    0   => "Username Exists",
                //    -1  => "Email Exists",
                //    _   => "Signed up successfully"
                //};
                switch (res)
                {
                    case 0:
                        errors.Add("Username Exists");
                        break;
                    case -1:
                        errors.Add("Email Exists");
                        break;
                    default:
                        message = "Signed up successfully";
                        await _mail.SendEmailAsync(
                       user.Email,
                       "Welcome to ALmondcove",
                       $"<!DOCTYPE html><html lang=\"en\"><head> <meta charset=\"UTF-8\">    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">    <title>Your OTP Code</title></head><body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #f8f8f8; border-radius: 5px;\">        <tr>            <td style=\"padding: 20px;\">                            <h1 style=\"color: #4a4a4a; text-align: center;\">Verify your email</h1>                <p style=\"text-align: center; font-size: 16px;\">Use the following OTP to complete your action:</p>                <div style=\"background-color: #ffffff; border: 2px solid #e0e0e0; border-radius: 5px; padding: 15px; margin: 20px 0; text-align: center;\">                    <span style=\"font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4285f4;\">{user.OTP}</span>                </div>                <p style=\"text-align: center; font-size: 14px;\">This OTP will expire in 10 minutes.</p>                <p style=\"text-align: center; font-size: 14px;\">If you didn't request this OTP, please ignore this email or contact support if you have concerns.</p>            </td>        </tr>    </table>    <p style=\"text-align: center; font-size: 12px; color: #888; margin-top: 20px;\">        &copy; 2024 Almondcove. All rights reserved.    </p></body></html>",
                       isHtml: true);
                        break;
                }

                statCode = errors.Count == 0 ? StatusCodes.Status200OK : StatusCodes.Status409Conflict;

                return (statCode, 0, message, errors);

            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        //[HttpPost("verify")]
        //[AllowAnonymous]
        //#region VERIFY USER CONTROLLER
        //public async Task<IActionResult> VerifyUser([FromBody] UserVerifyRequest request)
        //{
        //    int statCode = StatusCodes.Status400BadRequest;
        //    string message = "";
        //    List<string> errors = [];

        //    #region MAP UserVerifyRequest -> User
        //    #endregion

        //    return await ExecuteActionAsync(async () =>
        //    {
        //        int res = await _userRepo.VerifyUser(request);

        //        message = res switch
        //        {
        //            -1 => "User does not exist",
        //            -2 => "User already verified",
        //            -3 => "OTP expired",
        //            -4 => "Invalid OTP",
        //            1 => "User verified successfully",
        //            _ => "Unknown error"
        //        };

        //        statCode = res switch
        //        {
        //            1 => StatusCodes.Status200OK,
        //            -1 => StatusCodes.Status404NotFound,
        //            -2 => StatusCodes.Status409Conflict,
        //            -3 => StatusCodes.Status410Gone,
        //            -4 => StatusCodes.Status400BadRequest,
        //            _ => StatusCodes.Status500InternalServerError
        //        };

        //        return (statCode, 0, message, errors);

        //    }, MethodBase.GetCurrentMethod().Name);
        //}
        //#endregion

        [HttpPost("verify")]
        [AllowAnonymous]
        #region VERIFY USER CONTROLLER
        public async Task<IActionResult> VerifyUser([FromBody] UserVerifyRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "";
            List<string> errors = [];

            #region MAP UserVerifyRequest -> User
            #endregion

            return await ExecuteActionAsync(async () =>
            {
                int res = await _userRepo.VerifyUser(request);

                message = res switch
                {
                    -1 => "User does not exist",
                    -2 => "User already verified",
                    -3 => "OTP expired",
                    -4 => "Invalid OTP",
                    1 => "User verified successfully",
                    _ => "Unknown error"
                };

                statCode = res switch
                {
                    1 => StatusCodes.Status200OK,
                    -1 => StatusCodes.Status404NotFound,
                    -2 => StatusCodes.Status409Conflict,
                    -3 => StatusCodes.Status410Gone,
                    -4 => StatusCodes.Status400BadRequest,
                    _ => StatusCodes.Status500InternalServerError
                };

                if (res == 1)
                {
                    var userClaims = await _userRepo.GetUserClaims(request.Email);
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.Email, userClaims.Email),
                        new Claim(ClaimTypes.Role, userClaims.Role),
                        new Claim("UserName", userClaims.FirstName),
                        new Claim("FirstName", userClaims.FirstName),
                        new Claim("LastName", userClaims.LastName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.CurrentValue.JwtSettings.IssuerSigningKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: _config.CurrentValue.JwtSettings.ValidIssuer,
                        audience: _config.CurrentValue.JwtSettings.ValidAudience,
                        claims: claims,
                        expires: DateTime.Now.AddDays(7),
                        signingCredentials: creds);

                    userClaims.Token = new JwtSecurityTokenHandler().WriteToken(token);

                    return (statCode, userClaims, message, errors);
                }

                return (statCode, null, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion



        [HttpPost("login")]
        [AllowAnonymous]
        #region LOGIN CONTROLLER
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "";
            List<string> errors = [];
            (int result, UserClaims userClaims) = await _userRepo.LoginUser(request);

            return await ExecuteActionAsync(async () =>
            {
                message = result switch
                {
                    -1 => "Invalid username or password",
                    -2 => "User is not verified",
                    -3 => "User is inactive",
                     1 => "Login successful",
                     _ => "Unexpected error"
                };

                statCode = result switch
                {
                     1 => StatusCodes.Status200OK,
                    -1 => StatusCodes.Status400BadRequest,
                    -2 => StatusCodes.Status403Forbidden,
                    -3 => StatusCodes.Status403Forbidden,
                    _  => StatusCodes.Status500InternalServerError
                };

                if (result == 1)
                {
                    var claims = new[]
                       {
                            new Claim(ClaimTypes.Email, userClaims.Email),
                            new Claim(ClaimTypes.Role, userClaims.Role),
                            new Claim("UserName", userClaims.FirstName),
                            new Claim("FirstName", userClaims.FirstName),
                            new Claim("LastName", userClaims.LastName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                        };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.CurrentValue.JwtSettings.IssuerSigningKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: _config.CurrentValue.JwtSettings.ValidIssuer,
                        audience: _config.CurrentValue.JwtSettings.ValidAudience,
                        claims: claims,
                        expires: DateTime.Now.AddDays(7),
                        signingCredentials: creds);

                    userClaims.Token = new JwtSecurityTokenHandler().WriteToken(token);
                }

                
                return (statCode, userClaims, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

        [HttpPost("add-recovery-entry")]
        [AllowAnonymous]
        #region ADD RECOVERY ENTRY CONTROLLER
        public async Task<IActionResult> AddRecoveryEntry([FromBody] UserRecoveryRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "Error";
            List<string> errors = [];

            return await ExecuteActionAsync<object>(async () =>
            {
                var user = await _userRepo.GetUserClaims(request.Email);

                if (user == null)
                {
                    message = "User not found";
                    statCode = StatusCodes.Status404NotFound;
                }
                else
                {
                    var otp = _random.Next(1000, 9999);
                    var otpExpiration = DateTime.UtcNow.AddMinutes(10); // OTP expires in 10 minutes

                    var result = await _userRepo.AddRecoveryEntry(request.Email, otp, otpExpiration);

                    if (result)
                    {
                        message = "Recovery entry added successfully";
                        statCode = StatusCodes.Status200OK;

                        await _mail.SendEmailAsync(
                           user.Email,
                           "Password Recovery OTP",
                           $"<!DOCTYPE html><html lang=\"en\"><head> <meta charset=\"UTF-8\">    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">    <title>Your OTP Code</title></head><body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color: #f8f8f8; border-radius: 5px;\">        <tr>            <td style=\"padding: 20px;\">                            <h1 style=\"color: #4a4a4a; text-align: center;\">Password Recovery</h1>                <p style=\"text-align: center; font-size: 16px;\">Use the following OTP to recover your account:</p>                <div style=\"background-color: #ffffff; border: 2px solid #e0e0e0; border-radius: 5px; padding: 15px; margin: 20px 0; text-align: center;\">                    <span style=\"font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4285f4;\">{otp}</span>                </div>                <p style=\"text-align: center; font-size: 14px;\">This OTP will expire in 10 minutes.</p>                <p style=\"text-align: center; font-size: 14px;\">If you didn't request this OTP, please ignore this email or contact support if you have concerns.</p>            </td>        </tr>    </table>    <p style=\"text-align: center; font-size: 12px; color: #888; margin-top: 20px;\">        &copy; 2024 Almondcove. All rights reserved.    </p></body></html>",
                           isHtml: true);
                    }
                    else
                    {
                        message = "Failed to add recovery entry";
                        statCode = StatusCodes.Status500InternalServerError;
                    }
                }

                return (statCode, null, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion


        [HttpPost("recover")]
        [AllowAnonymous]
        #region RECOVERY CONTROLLER
        public async Task<IActionResult> RecoverAccount([FromBody] UserRecoveryRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "Error";
            List<string> errors = new List<string>();

            return await ExecuteActionAsync(async () =>
            {
                var user = await _userRepo.GetUserByEmailAndOtp(request);

                if (user == null)
                {
                    message = "Invalid email or OTP";
                    statCode = StatusCodes.Status404NotFound;
                }
                else
                {
                    var userClaims = await _userRepo.GetUserClaims(user.Email);

                    var claims = new[]
                    {
                        new Claim(ClaimTypes.Email, userClaims.Email),
                        new Claim(ClaimTypes.Role, userClaims.Role),
                        new Claim("UserName", userClaims.FirstName),
                        new Claim("FirstName", userClaims.FirstName),
                        new Claim("LastName", userClaims.LastName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.CurrentValue.JwtSettings.IssuerSigningKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: _config.CurrentValue.JwtSettings.ValidIssuer,
                        audience: _config.CurrentValue.JwtSettings.ValidAudience,
                        claims: claims,
                        expires: DateTime.Now.AddDays(7),
                        signingCredentials: creds);

                    userClaims.Token = new JwtSecurityTokenHandler().WriteToken(token);

                    message = "Recovery successful";
                    statCode = StatusCodes.Status200OK;

                    return (statCode, userClaims, message, errors);
                }

                return (statCode, null, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion


        [HttpPost("google-login")]
        public async Task<ActionResult> GoogleLogin([FromBody] GoogleLoginDto model)
        {
            var idtoken = model.IdToken;
            var setting = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new string[] { "881148390473-rodjtppcckgpft8guo2bkttnlcg5gmb2.apps.googleusercontent.com" }
            };
            var result = await GoogleJsonWebSignature.ValidateAsync(idtoken, setting);
            if (result is null)
            {
                return BadRequest();
            }
            var token = result.Email;
            return Ok(new { token = token });
        }
    }
    public class GoogleLoginDto
    {
        public string IdToken { get; set; }
    }
}
