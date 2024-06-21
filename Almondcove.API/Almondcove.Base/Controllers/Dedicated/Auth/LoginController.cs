using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Almondcove.Base.Controllers.Dedicated.Auth
{
    [Route("api/")]
    [ApiController]
    public class LoginController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor) 
                : FoundationController(config, logger, httpContextAccessor)
    {

    }
}
