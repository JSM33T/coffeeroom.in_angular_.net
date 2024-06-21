using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Repositories
{
    public class MailingListRepository : IMailingListRepository
    {

        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        private string _conStr;

        public MailingListRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<MailingListRepository> logger)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;

        }


        public async Task<int> AddMailingListAsync(MailingList mailingList)
        {
            const string storedProcedure = "AddMailingListSubscriber";

            using var connection = new SqlConnection(_conStr);
            var parameters = new DynamicParameters();
            parameters.Add("Name", mailingList.Name, DbType.String);
            parameters.Add("Mail", mailingList.Mail, DbType.String);
            parameters.Add("Message", mailingList.Message, DbType.String);
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
