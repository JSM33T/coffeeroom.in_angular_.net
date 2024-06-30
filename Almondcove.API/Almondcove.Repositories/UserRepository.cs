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
    public class UserRepository : IUserRepository
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        private string _conStr;

        public UserRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<MessageRepository> logger)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
        }

        public async Task<(int, UserClaims)> LoginUser(UserLoginRequest loginRequest)
        {
            const string storedProcedure = "dbo.usp_GetUserClaims";

            using var connection = new SqlConnection(_conStr);
            var parameters = new DynamicParameters();
            parameters.Add("Username", loginRequest.Username, DbType.String);
            parameters.Add("Password", loginRequest.Password, DbType.String);
            parameters.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            var userClaims = await connection.QueryFirstOrDefaultAsync<UserClaims>(
                storedProcedure,
                parameters,
                commandType: CommandType.StoredProcedure);

            var result = parameters.Get<int>("Result");

            return (result, userClaims);
        }



        public async Task<int> SignUpUser(User user)
        {
            const string storedProcedure = "dbo.usp_SignUpUser";

            using var connection = new SqlConnection(_conStr);
            var parameters = new DynamicParameters();
            parameters.Add("Username", user.Username, DbType.String);
            parameters.Add("FirstName", user.FirstName, DbType.String);
            parameters.Add("LastName", user.LastName, DbType.String);
            parameters.Add("Email", user.Email, DbType.String);
            parameters.Add("PasswordHash", user.PasswordHash, DbType.String);
            parameters.Add("OTP", user.OTP, DbType.Int32);
            parameters.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await connection.ExecuteAsync(
                storedProcedure,
                parameters,
                commandType: CommandType.StoredProcedure);

            return parameters.Get<int>("Result");
        }

        public async Task<int> VerifyUser(UserVerifyRequest userVerifyRequest)
        {
            const string storedProcedure = "dbo.usp_VerifyUser";

            using var connection = new SqlConnection(_conStr);
            var parameters = new DynamicParameters();
            parameters.Add("Email", userVerifyRequest.Email, DbType.String);
            parameters.Add("OTP", userVerifyRequest.OTP, DbType.Int32);
            parameters.Add("Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await connection.ExecuteAsync(
                storedProcedure,
                parameters,
                commandType: CommandType.StoredProcedure);

            return parameters.Get<int>("Result");
        }

    }
}
