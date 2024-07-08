using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/tester")]
    [ApiController]
    public class TestController : FoundationController
    {
        public TestController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor) : base(config, logger, httpContextAccessor)
        {
        }

        [HttpGet("a")]
        #region SIGNUP CONTROLLER
        public async Task<IActionResult> Post()
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "";
            List<string> errors = [];

            message = "well ig its working";
            statCode = StatusCodes.Status200OK;

            return await ExecuteActionAsync(async () =>
            {
                return (statCode, 0, message, errors);

            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion
    }
}
