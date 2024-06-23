using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/users")]
    [ApiController]
    public class SignupController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<SignupController> logger, IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
                                        : FoundationController(config, logger, httpContextAccessor)
    {
        private readonly IUserRepository _userRepo = userRepository;

        [HttpPost("add")]
        public async Task<IActionResult> Post([FromBody] UserAddRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "";
            List<string> errors = [];

            #region MAP UserAddRequest -> User
            var user = new User
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
    }
}
