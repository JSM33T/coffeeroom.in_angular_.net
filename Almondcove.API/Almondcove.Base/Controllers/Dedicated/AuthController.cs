using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Almondcove.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using Telegram.Bot.Types;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<AuthController> logger, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository,IUserService userService) : FoundationController(config, logger, httpContextAccessor)
    {
        private readonly IUserRepository _userRepo = userRepository;
        private readonly IUserService _userService = userService;

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserAddRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "";
            List<string> errors = [];

            #region MAP UserAddRequest -> User
            var user = new Entities.Dedicated.User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Username = request.Username,
                Email = request.Email,
                PasswordHash = request.Password
            };
            #endregion

            return await ExecuteActionAsync(async () =>
            {
                int res = await _userRepo.SignUpUser(user);

                message = res switch
                {
                    0   => "Username Exists",
                    -1  => "Email Exists",
                    _   => "Signed up successfully"
                };

                statCode = res > 0 ? StatusCodes.Status200OK : StatusCodes.Status409Conflict;

                return (statCode, 0, message, errors);

            }, MethodBase.GetCurrentMethod().Name);
        }

        [HttpPost("login")]
        [AllowAnonymous]
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
                    0 => "Invalid username or password",
                    1 => "Login successful",
                    _ => "Unexpected error"
                };

                statCode = result > 0 ? StatusCodes.Status200OK : StatusCodes.Status401Unauthorized;

                if (result > 0)
                {
                    //await _userService.SetUserClaims(HttpContext, userClaims);


                    var claims = new[]
                       {
                            new Claim(ClaimTypes.Email, userClaims.Email),
                            new Claim(ClaimTypes.Role, userClaims.Role),
                            new Claim("UserName", userClaims.FirstName),
                            new Claim("FirstName", userClaims.FirstName),
                            new Claim("LastName", userClaims.LastName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                        };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("iureowtueorituowierutoi4354=====sds=="));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: "http://localhost:4200",
                        audience: "http://localhost:5176",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: creds);

                    userClaims.Token = new JwtSecurityTokenHandler().WriteToken(token);
                }

                
                return (statCode, userClaims, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
