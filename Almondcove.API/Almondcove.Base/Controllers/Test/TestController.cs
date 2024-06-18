using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Dedicated.Auth;
using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Almondcove.Base.Controllers.Test
{
    [Route("api/test")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IOptionsMonitor<AlmondcoveConfig> _config;
        public TestController(IOptionsMonitor<AlmondcoveConfig> config)
        {
            _config = config;
        }

        [HttpPost("sample")]
        public IActionResult GetSampleData(LoginRequest loginRequest)
        {
            APIResponse<int> objResponse = new(StatusCodes.Status200OK, "", 1, null);

            objResponse.Message = "Hey i received your wmail which is ";

            return StatusCode(objResponse.Status, objResponse);
            
        }

        [HttpPost("subscribe")]
        public ActionResult<APIResponse<int>> SubscribeMailingList(GetMailSubmitrequest emailmailRequest)
        {
            APIResponse<int> objResponse = new(StatusCodes.Status200OK, "", 1, null);

            objResponse.Message = $"Hey i received your wmail which is {emailmailRequest.Email}";
            objResponse.Errors.Add("nah");
            objResponse.Status = StatusCodes.Status400BadRequest;

            return StatusCode(objResponse.Status, objResponse);
        }
    }

   
}
