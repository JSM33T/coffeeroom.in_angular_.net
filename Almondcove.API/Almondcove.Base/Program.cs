using Almondcove.Base.Middlewares;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters();

builder.Services.AddValidatorsFromAssembly(Assembly.Load("Almondcove.Validators"));

builder.Services.AddControllers();

builder.Services.AddScoped<IMailingListRepository, MailingListRepository>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://",
        ValidAudience = "your-api-url",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSecretKey"))
    };
});






var rateLimitingOptions = new RateLimitingOptions();
builder.Configuration.GetSection("RateLimiting").Bind(rateLimitingOptions);



builder.Services.AddRateLimiter(options =>
{
    // Apply global rate limiting
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
    {
        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                PermitLimit = rateLimitingOptions.Global.PermitLimit,
                Window = rateLimitingOptions.Global.Window,
                QueueLimit = rateLimitingOptions.Global.QueueLimit,
            });
    });

    // Apply rate limiting for specific routes
    foreach (var route in rateLimitingOptions.Routes)
    {
        options.AddFixedWindowLimiter(route.Key, opt =>
        {
            opt.PermitLimit = route.Value.PermitLimit;
            opt.Window = route.Value.Window;
            opt.QueueLimit = route.Value.QueueLimit;
        });
    }

    options.RejectionStatusCode = 429; // Too Many Requests
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllHeaders",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


builder.Services.AddEndpointsApiExplorer();

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.Configure<AlmondcoveConfig>(builder.Configuration.GetSection("AlmondcoveConfig"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  
}
app.UseMiddleware<AcValidationMiddleware>();
app.UseCors("AllowAllHeaders");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
