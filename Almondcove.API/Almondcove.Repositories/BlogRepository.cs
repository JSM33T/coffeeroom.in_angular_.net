
using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Almondcove.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        protected readonly IOptionsMonitor<AlmondcoveConfig> _config;
        protected readonly ILogger _logger;
        private string _conStr;

        public BlogRepository(IOptionsMonitor<AlmondcoveConfig> config, ILogger<BlogRepository> logger)
        {
            _config = config;
            _logger = logger;
            _conStr = _config.CurrentValue.ConnectionString;
        }

        public async Task<(int,List<BlogsGet>)> GetLatestBlogs(int n)
        {
            List<BlogsGet> blogs = [];
            List<BlogAuthor> authors = [];

            const string query = "SELECT TOP 5 * FROM tblBlogPosts";

            using var connection = new SqlConnection(_conStr);
            blogs = (await connection.QueryAsync<BlogsGet>(query)).ToList();

            foreach (var blog in blogs)
            {
                blog.Authors =await GetBlogAuthors(blog.Id);
            }

            return (1,blogs);
        }

        public async Task<List<BlogAuthor>> GetBlogAuthors(int id)
        {
            const string query = @"
                                SELECT ba.*, u.*
                                FROM tblBlogAuthors ba
                                INNER JOIN tblUsers u ON ba.UserId = u.Id
                                WHERE ba.BlogId = @Id";

            using var connection = new SqlConnection(_conStr);
            var authors = (await connection.QueryAsync<BlogAuthor>(query, new { Id = id })).ToList();

            return authors;
        }


    }
}
