using Almondcove.Entities.Shared;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Services
{
    public class CryptoService : ICryptoService
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        private readonly string _key;
        private readonly string _IV;

        public CryptoService(IOptionsMonitor<AlmondcoveConfig> config, ILogger<CryptoService> logger)
        {
            _config = config;
            _logger = logger;
            _key = _config.CurrentValue.Cryptography.Key;
            _IV = _config.CurrentValue.Cryptography.IV;
        }

        public async Task<string> Decrupt(string Input)
        {
            return Input;
        }

        public async Task<string> Encrypt(string Input)
        {
            return Input;
        }
    }
}
