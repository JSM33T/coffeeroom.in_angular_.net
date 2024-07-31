
using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text;

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

        //public async Task<List<BlogsGet>> GetLatestBlogs(string category,string tag,int year)
        //{
        //    List<BlogsGet> blogs = [];
        //    List<BlogAuthor> authors = [];

        //    const string query = "SELECT TOP 10 * FROM tblBlogPosts";

        //    using var connection = new SqlConnection(_conStr);
        //    blogs = (await connection.QueryAsync<BlogsGet>(query)).ToList();

        //    foreach (var blog in blogs)
        //    {
        //        blog.Authors =await GetBlogAuthors(blog.Id);
        //    }

        //    return blogs;
        //}
        public async Task<List<BlogsGet>> GetLatestBlogs(string category, string tag, int? year,string search)
        {
            List<BlogsGet> blogs = new List<BlogsGet>();

            var queryBuilder = new StringBuilder(@"SELECT TOP 10 A.*,B.Slug as Category FROM tblBlogPosts A
                                                    INNER JOIN tblBlogCategories B
                                                    on B.Id = a.BlogCategory
                                                    ");

            var conditions = new List<string>();
            var parameters = new DynamicParameters();

            if (!string.IsNullOrEmpty(category))
            {
                conditions.Add("B.Slug = @Category");
                parameters.Add("Category", category);
            }

            if (!string.IsNullOrEmpty(tag))
            {
                conditions.Add("A.Tags = @Tag");
                parameters.Add("Tag", $"%{tag}%");
            }

            if (!string.IsNullOrEmpty(search))
            {
                conditions.Add("A.Description LIKE @Search");
                parameters.Add("Search", $"%{search}%");
            }



            if (year.HasValue)
            {
                conditions.Add("YEAR(A.DateAdded) = @Year");
                parameters.Add("Year", year.Value);
            }
         
            if (conditions.Count > 0)
            {
                queryBuilder.Append(" WHERE A.IsActive = 1 AND ");
                queryBuilder.Append(string.Join(" AND ", conditions));
            }

            queryBuilder.Append(" ORDER BY DateAdded DESC");

            using var connection = new SqlConnection(_conStr);
            blogs = (await connection.QueryAsync<BlogsGet>(queryBuilder.ToString(), parameters)).ToList();

            foreach (var blog in blogs)
            {
                blog.Authors = await GetBlogAuthors(blog.Id);
            }

            return blogs;
        }
        public async Task<List<BlogCategory>> GetBlogCategories()
        {
            List<BlogCategory> categories = [];

            const string query = @"SELECT 
                                    c.[Id],
                                    c.[Name],
                                    c.[Slug],
                                    c.[Description],
                                    c.[DateAdded],
                                    COUNT(p.[Id]) AS BlogCount
                                FROM 
                                    [almondcove_db].[dbo].[tblBlogCategories] c
                                LEFT JOIN 
                                    [almondcove_db].[dbo].[tblBlogPosts] p
                                ON 
                                    c.[Id] = p.Id
                                GROUP BY 
                                    c.[Id], 
                                    c.[Name], 
                                    c.[Slug], 
                                    c.[Description], 
                                    c.[DateAdded]";

            using var connection = new SqlConnection(_conStr);
            categories = (await connection.QueryAsync<BlogCategory>(query)).ToList();

      
            return categories;
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
