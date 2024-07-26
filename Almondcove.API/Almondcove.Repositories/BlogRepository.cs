
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

        public async Task<List<BlogsGet>> GetLatestBlogs(int n)
        {
            List<BlogsGet> blogs = [];
            List<BlogAuthor> authors = [];

            const string query = "SELECT TOP 10 * FROM tblBlogPosts";

            using var connection = new SqlConnection(_conStr);
            blogs = (await connection.QueryAsync<BlogsGet>(query)).ToList();

            foreach (var blog in blogs)
            {
                blog.Authors =await GetBlogAuthors(blog.Id);
            }

            return blogs;
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

        public async Task<BlogDetailsGet> GetBlogDetailsBySlug(string slug)
        {
            const string query = @"
                                SELECT b.Id, b.Title, b.Description,b.Tags, b.ContentMD, b.DateAdded
                                FROM tblBlogPosts b
                                WHERE b.Slug = @Slug";

            using var connection = new SqlConnection(_conStr);
            var blog = await connection.QuerySingleOrDefaultAsync<BlogDetailsGet>(query, new { Slug = slug });

            if (blog != null)
            {
                blog.Authors = await GetBlogAuthors(blog.Id);
            }

            return blog;
        }

    }
}
