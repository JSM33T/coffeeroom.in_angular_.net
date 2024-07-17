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
    public class AuthController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<AuthController> logger, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository,IUserService userService) : FoundationController(config, logger, httpContextAccessor)
    {
        private readonly IUserRepository _userRepo = userRepository;
        private readonly IUserService _userService = userService;
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
                        break;
                }

                statCode = errors.Count == 0 ? StatusCodes.Status200OK : StatusCodes.Status409Conflict;

                return (statCode, 0, message, errors);

            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion

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

                return (statCode, 0, message, errors);

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
                            //new Claim("UserName", userClaims.FirstName),
                            //new Claim("FirstName", userClaims.FirstName),
                            //new Claim("LastName", userClaims.LastName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                        };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.CurrentValue.JwtSettings.IssuerSigningKey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: _config.CurrentValue.JwtSettings.ValidIssuer,
                        audience: _config.CurrentValue.JwtSettings.ValidAudience,
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: creds);

                    userClaims.Token = new JwtSecurityTokenHandler().WriteToken(token);
                }

                
                return (statCode, userClaims, message, errors);
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
