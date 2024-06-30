using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/messages")]
   
    [ApiController]
    public class MessagesController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<MessagesController> logger, IHttpContextAccessor httpContextAccessor, IMessageRepository mailingListRepository)
                                        : FoundationController(config, logger, httpContextAccessor)
    {
        private readonly IMessageRepository _mailRepo = mailingListRepository;


        [HttpPost("add")]
        [Authorize(Roles = "user")]
        #region SIGNUP CONTROLLER
        public async Task<IActionResult> Post([FromBody] MessageAddRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "";
            List<string> errors = [];
            _logger.LogError("checkkk");
            return await ExecuteActionAsync(async () =>
            {
                #region MAP MailingListRequest -> MailingList
                var mailingList = new Message
                {
                    Name = request.Name,      
                    Mail = request.Mail,
                    MessageText = request.MessageText,
                    Topic = request.Topic,
                    Origin = HttpContext.Request.Headers.Referer.ToString() ?? "unknown",
                    UserAgent = HttpContext.Request.Headers.UserAgent.ToString() ?? "unknown",
                    DateAdded = DateTime.Now
                };
                #endregion

                var id = await _mailRepo.AddMessage(mailingList);
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
        #endregion
    }
}
