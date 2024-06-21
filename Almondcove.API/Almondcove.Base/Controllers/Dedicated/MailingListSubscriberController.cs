using Almondcove.Api.Controllers;
using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/mailinglistsubscriber")]
    [ApiController]
    public class MailingListSubscriberController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<SampleController> logger, IHttpContextAccessor httpContextAccessor, IMailingListRepository mailingListRepository)
                                        : FoundationController(config, logger, httpContextAccessor)
    {
        private readonly IMailingListRepository _mailRepo = mailingListRepository;

        [HttpPost("add")]
        public async Task<IActionResult> Post([FromBody] MailingListRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "";
            List<string> errors = [];


            return await ExecuteActionAsync(async () =>
            {
                #region MAP MailingListRequest -> MailingList
                var mailingList = new MailingList
                {
                    Name = request.Name,
                    Mail = request.Mail,
                    Message = request.Message,
                    Topic = request.Topic,
                    Origin = HttpContext.Request.Headers.Referer.ToString() ?? "unknown",
                    UserAgent = HttpContext.Request.Headers.UserAgent.ToString() ?? "unknown",
                    DateAdded = DateTime.Now
                };
                #endregion

                var id = await _mailRepo.AddMailingListAsync(mailingList);
                if (id == 0)
                {
                    #region RESPONSE -> Conflict
                    errors.Add("Conflict with existing message with same email");
                    statCode = StatusCodes.Status409Conflict;
                    message = "Message exists";
                    #endregion
                }
                else
                {
                    #region RESPONSE -> Success
                    statCode = StatusCodes.Status200OK;
                    message = "Message sent successfully";
                    #endregion
                }

                return (statCode, 0, message, errors);

            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
