using Almondcove.Entities.Dedicated;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Almondcove.Services
{
    public class UserService : IUserService
    {
        public async Task SetUserClaims(HttpContext httpContext, UserClaims userClaims)
        {
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, userClaims.Username),
            new Claim(ClaimTypes.Email, userClaims.Email),
            new Claim(ClaimTypes.NameIdentifier, userClaims.Id.ToString()),
            new Claim("Role", userClaims.Role)
        };

            var identity = new ClaimsIdentity(claims, "Custom");
            var principal = new ClaimsPrincipal(identity);
            await httpContext.SignInAsync(principal);
        }
    }
}
