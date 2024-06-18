using Almondcove.Base.Controllers;
using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Almondcove.Entities.Dedicated;

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
               
                await Task.Delay(100);

                var data = new { Id = 1, model.Email, Setting = _config.CurrentValue.Setting1 };

                var ss = 0;
                return (201, data, "Data posted successfully");

            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
