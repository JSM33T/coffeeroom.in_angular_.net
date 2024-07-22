using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;
using System.Text;
using System.Text.Json;

namespace Almondcove.Base.Controllers.Apps
{
    public class TranslationRequest
    {
        public List<string> TranslateText { get; set; }
        public string SourceLang { get; set; } = "en";
        public string TargetLang { get; set; } = "hi";
    }

    public class TranslationResponse
    {
        public List<string> TranslatedText { get; set; }
    }

    [Route("api/language")]
    [ApiController]
    public class LanguageController : FoundationController
    {
        private readonly HttpClient _client;

        public LanguageController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, HttpClient client)
            : base(config, logger, httpContextAccessor)
        {
            _client = client;
        }

        [HttpPost("translate")]
        [AllowAnonymous]
        #region MESSAGE CONTROLLER
        public async Task<IActionResult> Post([FromBody] TranslationRequest request)
        {
            int statCode = StatusCodes.Status400BadRequest;
            string message = "Error";
            List<string> errors = [];
            TranslationResponse response = null;

            return await ExecuteActionAsync(async () =>
            {


                if (response != null)
                {
                    Console.WriteLine($"Translated Text: {string.Join(", ", response.TranslatedText)}");
        
                }

                var url = "https://flask-translator-api.vercel.app/translate"; // Replace with your API endpoint
                var jsonRequest = JsonSerializer.Serialize(request);
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

                var httpResponse = await _client.PostAsync(url, content);
                if (httpResponse.IsSuccessStatusCode)
                {
                    var jsonResponse = await httpResponse.Content.ReadAsStringAsync();
                    response = JsonSerializer.Deserialize<TranslationResponse>(jsonResponse);
                    statCode = StatusCodes.Status200OK;
                    message = "Retrieved";
                }

                return (statCode, response.TranslatedText.First(), message, errors);

            }, MethodBase.GetCurrentMethod().Name);
        }
        #endregion
    }
}
