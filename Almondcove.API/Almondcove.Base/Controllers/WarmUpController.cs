using Almondcove.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Almondcove.Base.Controllers
{
    [Route("/")]
    [ApiController]
    public class WarmUpController : ControllerBase
    {
        private readonly IActionDescriptorCollectionProvider _actionDescriptorCollectionProvider;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public WarmUpController(IActionDescriptorCollectionProvider actionDescriptorCollectionProvider, IConfiguration configuration, IWebHostEnvironment environment)
        {
            _actionDescriptorCollectionProvider = actionDescriptorCollectionProvider;
            _configuration = configuration;
            _environment = environment;
        }

        [HttpGet]
        public IActionResult WarmUp()
        {
            var userAgent = Request.Headers["User-Agent"].ToString();
            var requestTime = DateTime.UtcNow;

            var metadata = MetadataHelper.GetMetadata(_actionDescriptorCollectionProvider, _configuration, _environment, userAgent, requestTime);
            return Ok(metadata);
        }
    }

}
