using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;

namespace Almondcove.Repositories
{
    public class MessageRepository : IMessageRepository
    {

        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        private string _conStr;

        public MessageRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<MessageRepository> logger)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
        }

        public async Task<int> AddMessage(Message mailingList)
        {
            const string storedProcedure = "dbo.usp_AddMessage";

            using var connection = new SqlConnection(_conStr);
            var parameters = new DynamicParameters();
            parameters.Add("Name", mailingList.Name, DbType.String);
            parameters.Add("Mail", mailingList.Mail, DbType.String);
            parameters.Add("Message", mailingList.MessageText, DbType.String);
            parameters.Add("Topic", mailingList.Topic, DbType.String);
            parameters.Add("Origin", mailingList.Origin, DbType.String);
            parameters.Add("UserAgent", mailingList.UserAgent, DbType.String);
            parameters.Add("DateAdded", mailingList.DateAdded, DbType.DateTime);

            return await connection.QuerySingleAsync<int>(
                storedProcedure,
                parameters,
                commandType: CommandType.StoredProcedure);
        }
    }
}
