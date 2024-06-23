using Almondcove.Entities.Shared;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Almondcove.Utilities
{
    public class Crypto
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        private string _conStr;

        public Crypto(IOptionsMonitor<AlmondcoveConfig> config, ILogger<Crypto> logger)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
        }

    }
}
