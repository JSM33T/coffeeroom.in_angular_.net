using Almondcove.Entities.Dedicated;

namespace Almondcove.Repositories
{
    public interface IBlogRepository
    {
        public Task<(int,List<BlogsGet>)> GetLatestBlogs(int n);
        public Task<List<BlogAuthor>> GetBlogAuthors(int id);
    }
}
