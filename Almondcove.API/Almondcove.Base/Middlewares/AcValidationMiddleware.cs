using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Almondcove.Base.Middlewares
{
    public class AcValidationMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            var originalBodyStream = context.Response.Body; //Capture

            using var responseBody = new MemoryStream();
            context.Response.Body = responseBody;

            await _next(context); // Call next middleware

            if (context.Response.StatusCode == 400)
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
                        message = "Validation issue check",
                        errors = errorMessages,
                        data = 0
                    };
                   

                    var customResponseText = JsonConvert.SerializeObject(customResponse); //Serialize

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
            else
            {
                responseBody.Seek(0, SeekOrigin.Begin);
                await responseBody.CopyToAsync(originalBodyStream);
            }
        }
    }
}
