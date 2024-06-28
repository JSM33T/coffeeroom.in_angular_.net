using Almondcove.Base.Middlewares;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Reflection;
using System.Text;
using System.Threading.RateLimiting;
using Telegram.Bot;
using Serilog.Core;
using Serilog.Events;
using Telegram.Bot.Types.Enums;
using Almondcove.Services;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);


Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .WriteTo.Async(a => a.File($"Logs/log.txt", rollingInterval: RollingInterval.Hour))
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters();

builder.Services.AddValidatorsFromAssembly(Assembly.Load("Almondcove.Validators"));

builder.Services.AddControllers();

builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        RoleClaimType = ClaimTypes.Role, // Ensure the RoleClaimType is set correctly
        ValidIssuer = "http://localhost:5176",
        ValidAudience = "http://localhost:5176",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("iureowtueorituowierutoi4354=====sds=="))
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

if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);
}
else
{
    builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
}
builder.Services.Configure<AlmondcoveConfig>(builder.Configuration.GetSection("AlmondcoveConfig"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{

}
else
{
    
}

app.UseCors("AllowAllHeaders");
app.UseHttpsRedirection();
app.UseMiddleware<AcValidationMiddleware>();
app.UseStaticFiles();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
