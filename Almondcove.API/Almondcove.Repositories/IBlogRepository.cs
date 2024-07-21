using Almondcove.Entities.Dedicated;

namespace Almondcove.Repositories
{
    public interface IBlogRepository
    {
        public Task<List<BlogsGet>> GetLatestBlogs(int n);
        public Task<List<BlogAuthor>> GetBlogAuthors(int id);

        public Task<BlogDetailsGet> GetBlogDetailsBySlug(string slug);
    }
}
