using Almondcove.Entities.Shared;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Almondcove.Base.Middlewares
{
    public class AcValidationMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            var originalBodyStream = context.Response.Body;

            using var responseBody = new MemoryStream();
            context.Response.Body = responseBody;

            await _next(context);

            #region CheckFor 400
            if (context.Response.StatusCode == StatusCodes.Status400BadRequest)
            {
                
                responseBody.Seek(0, SeekOrigin.Begin); //scan and read response body

                var originalBodyText = await new StreamReader(responseBody).ReadToEndAsync();

                if (!string.IsNullOrEmpty(originalBodyText) && originalBodyText.Contains("\"traceId\""))
                {
                    // Deserialize
                    var originalResponse = JsonConvert.DeserializeObject<ValidationProblemDetails>(originalBodyText);

                    #region FOR ALL ERRORS
                    //var errorMessages = new List<string>();
                    //foreach (var error in originalResponse.Errors)
                    //{
                    //    foreach (var errorMessage in error.Value)
                    //    {
                    //        errorMessages.Add(errorMessage); // Collect all error messages
                    //    }
                    //}
                    #endregion

                    #region FOR FIRST ERROR PER FIELD
                    var errorMessages = new List<string>();
                    foreach (var error in originalResponse.Errors)
                    {
                        if (error.Value != null && error.Value.Length > 0)
                        {
                            errorMessages.Add(error.Value[0]); // Collect only the first error message
                        }
                    }
                    #endregion

                    var customResponse = new
                    {
                        status = StatusCodes.Status400BadRequest,
                        message = "Validation Error",
                        errors = errorMessages,
                        data = 0
                    };
                   

                    var customResponseText = JsonConvert.SerializeObject(customResponse);

                    context.Response.Body = originalBodyStream; // Restore 
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(customResponseText);
                }
                else
                {
                    responseBody.Seek(0, SeekOrigin.Begin);
                    await responseBody.CopyToAsync(originalBodyStream);
                }
            }
            #endregion

            #region CheckFor 429
            else if (context.Response.StatusCode == StatusCodes.Status429TooManyRequests)
            {
                var errorMessages = new List<string>
                {
                    "Too many requests. Please try again later."
                };

                var customResponse = new APIResponse<int>(
                    status: StatusCodes.Status429TooManyRequests,
                    message: "Rate limit exceeded",
                    data: 0,
                    errors: errorMessages
                );

                var customResponseText = JsonConvert.SerializeObject(customResponse);

                context.Response.Body = originalBodyStream;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(customResponseText);
            }
            #endregion

            #region CheckFor 415
            else if (context.Response.StatusCode == StatusCodes.Status429TooManyRequests)
            {
                var errorMessages = new List<string>
                {
                    "Invalid/Deformed request"
                };

                var customResponse = new APIResponse<int>(
                    status: StatusCodes.Status415UnsupportedMediaType,
                    message: "Invalid Request",
                    data: 0,
                    errors: errorMessages
                );

                var customResponseText = JsonConvert.SerializeObject(customResponse);

                context.Response.Body = originalBodyStream;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(customResponseText);
            }
            #endregion

            #region ALL CLEAR
            else
            {
                responseBody.Seek(0, SeekOrigin.Begin);
                await responseBody.CopyToAsync(originalBodyStream);
            }
            #endregion
        }

    }
}
