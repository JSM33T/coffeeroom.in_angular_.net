using Almondcove.Entities.Shared;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Almondcove.Services
{
    public class MailingService : IMailingService
    {
        private readonly IOptionsMonitor<AlmondcoveConfig> _config;
        private readonly SmtpSettings _smtpConfig;
        private readonly ILogger<MailingService> _logger;
        public MailingService(IOptionsMonitor<AlmondcoveConfig> config, ILogger<MailingService> logger)
        {
            _config = config;
            _logger = logger;
            _smtpConfig = _config.CurrentValue.SmtpSettings;
            
        }
        public async Task SendEmailAsync(string to, string subject, string body, bool isHtml = false)
        {
            try
            {
                var message = new MailMessage
                {
                    From = new MailAddress(_smtpConfig.FromEmail, _smtpConfig.FromName),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = isHtml
                };
                message.To.Add(to);

                using (var client = new SmtpClient(_smtpConfig.Server, _smtpConfig.Port))
                {
                    client.Credentials = new NetworkCredential(_smtpConfig.Username, _smtpConfig.Password);
                    client.EnableSsl = _smtpConfig.EnableSSL;

                   // await client.SendMailAsync(message);
                }

                _logger.LogInformation($"Email sent successfully to {to}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send email to {to}");
                throw;
            }
        }
    }
}
