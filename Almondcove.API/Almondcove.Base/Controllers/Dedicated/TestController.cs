using Almondcove.Entities.Shared;
using Almondcove.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/tester")]
    [ApiController]
    public class TestController : FoundationController
    {
        private IMailingService _mail;
        public TestController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor,IMailingService mailingService) : base(config, logger, httpContextAccessor)
        {
            _mail = mailingService;
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

        [Authorize]
        [HttpGet("mail")]
        public async Task<IActionResult> SendWelcomeEmail()
        {
            return await ExecuteActionAsync(async () =>
            {
                string message = string.Empty;
                int statusCode = StatusCodes.Status400BadRequest;
                List<string> errors = [];

                if (string.IsNullOrEmpty("jskainthofficial@gmail.com"))
                {
                    errors.Add("Email address is required.");
                    return (statusCode, (object)null, message, errors);
                }

                try
                {
                    await _mail.SendEmailAsync(
                        "jskainthofficial@gmail.com",
                        "Welcome to Our Service",
                        "<h1>Welcome!</h1><p>We're glad to have you on board.</p>",
                        isHtml: true);

                    statusCode = StatusCodes.Status200OK;
                    message = "Welcome email sent successfully.";
                }
                catch (Exception ex)
                {
                    statusCode = StatusCodes.Status500InternalServerError;
                    message = "Failed to send welcome email.";
                    errors.Add(ex.Message);
                    _logger.LogError(ex, "Error sending welcome email to {Email}", "jskainthofficial@gmail.com");
                }

                return (statusCode, (object)null, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
