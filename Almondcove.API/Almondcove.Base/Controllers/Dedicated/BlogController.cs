using Almondcove.Entities.Dedicated;
using Almondcove.Entities.Shared;
using Almondcove.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace Almondcove.Base.Controllers.Dedicated
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogController : FoundationController
    {
        private readonly IBlogRepository _blogRepo;

        public BlogController(IOptionsMonitor<AlmondcoveConfig> config, ILogger<FoundationController> logger, IHttpContextAccessor httpContextAccessor, IBlogRepository blogRepo)
            : base(config, logger, httpContextAccessor)
        {
            _blogRepo = blogRepo;
        }

        [HttpGet("top-5-blogs")]
        public async Task<IActionResult> GetTop5Blogs()
        {
            string message = string.Empty;
            int statusCode = StatusCodes.Status400BadRequest;
            List<string> errors = [];
            int i = 0;


            List<BlogAuthor> authors = [];
            List<BlogsGet> topBlogs = [];

            return await ExecuteActionAsync(async () =>
            {
               var (i,blogs) = await _blogRepo.GetLatestBlogs(2);
                statusCode = StatusCodes.Status200OK;
                message = "Blogs retrieved";

                return (statusCode, blogs, message, errors);
            }, MethodBase.GetCurrentMethod().Name);
        }
    }
}
