using Almondcove.Entities.Dedicated;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Services
{
    public interface IUserService
    {
        public Task SetUserClaims(HttpContext httpContext, UserClaims userClaims);
    }
}
