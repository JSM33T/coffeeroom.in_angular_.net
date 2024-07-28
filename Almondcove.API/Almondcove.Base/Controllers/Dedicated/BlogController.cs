using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Markdig;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogController : FoundationController
    {
        private readonly IBlogRepository _blogRepo;
        private readonly IMemoryCache _cache;

        public BlogController(IMemoryCache cache,IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, IBlogRepository blogRepo)
            : base(config, logger, httpContextAccessor)
        {
            _blogRepo = blogRepo;
            _cache = cache;
        }

        [HttpGet]
        public async Task<IActionResult> GetTop5Blogs([FromQuery] string category, [FromQuery] string tag, [FromQuery] int? year, [FromQuery] string search)
        {
            string message = string.Empty;
            int statusCode = StatusCodes.Status400BadRequest;
            List<string> errors = [];

            List<BlogAuthor> authors = [];
            List<BlogsGet> topBlogs = [];

            return await ExecuteActionAsync(async () =>
            {
                string cacheKey = $"bloghome_{category}_{tag}_{year}_{search}";

                if (!_cache.TryGetValue(cacheKey, out topBlogs))
                {
                    topBlogs = await _blogRepo.GetLatestBlogs(category,tag,year,search);

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromMinutes(5))
                        .SetAbsoluteExpiration(TimeSpan.FromMinutes(30));

                    _cache.Set(cacheKey, topBlogs, cacheEntryOptions);

                    message = "Blogs retrieved from database and cached";
                }
                else
                {
                    message = "Blogs retrieved from cache";
                }

                statusCode = StatusCodes.Status200OK;
                return (statusCode, topBlogs, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }

        [HttpGet("blogcategories")]
        public async Task<IActionResult> GetBlogCategories()
        {
            string message = string.Empty;
            int statusCode = StatusCodes.Status400BadRequest;
            List<string> errors = [];

            List<BlogCategory> categories = [];
          

            return await ExecuteActionAsync(async () =>
            {

                string cacheKey = "blog-categories";

                if (!_cache.TryGetValue(cacheKey, out categories))
                {

                    categories = await _blogRepo.GetBlogCategories();

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromMinutes(5))
                        .SetAbsoluteExpiration(TimeSpan.FromMinutes(30));

                    _cache.Set(cacheKey, categories, cacheEntryOptions);

                    message = "Blogs retrieved from database and cached";
                }
                else
                {
                    message = "Blogs retrieved from cache";
                }

                statusCode = StatusCodes.Status200OK;
                return (statusCode, categories, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }

        [HttpGet("blog-details/{Slug}")]
        public async Task<IActionResult> GetBlogDetails(string Slug)
        {
            string message = string.Empty;
            int statusCode = StatusCodes.Status400BadRequest;
            BlogDetailsGet blogDetails = null;
            List<string> errors = [];

            return await ExecuteActionAsync(async () =>
            {
                blogDetails = await _blogRepo.GetBlogDetailsBySlug(Slug);
                blogDetails.ContentMD = blogDetails.ContentMD;
                blogDetails.ContentMD = Markdown.ToHtml(blogDetails.ContentMD);
                statusCode = StatusCodes.Status200OK;
                message = "Blogs retrieved";
                return (statusCode, blogDetails, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
    
    }
}
