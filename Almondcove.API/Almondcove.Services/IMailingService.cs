using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Services
{
    public interface IMailingService
    {
        public Task SendEmailAsync(string to, string subject, string body, bool isHtml = false);
    }
}
