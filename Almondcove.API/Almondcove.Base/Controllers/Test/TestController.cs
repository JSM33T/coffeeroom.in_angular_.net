using Almondcove.Base.Controllers;
using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Api.Controllers
{
    [Route("api/[controller]")]
    public class SampleController : FoundationController
    {
        public SampleController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<SampleController> logger, IHttpContextAccessor httpContextAccessor)
            : base(config, logger, httpContextAccessor)
        {
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddEmailRequest model)
        {
            return await ExecuteActionAsync(async () =>
            {
                List<string> errors = [];


                await Task.Delay(1000);

                var data = new { Id = 1, model.Email, Setting = _config.CurrentValue.Setting1 };
                errors.Add("sas");

                return (StatusCodes.Status200OK, data, "Data posted successfully",errors);

            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
