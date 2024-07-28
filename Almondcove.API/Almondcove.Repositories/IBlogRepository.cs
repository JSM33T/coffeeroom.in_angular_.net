using Almondcove.Entities.Dedicated;

namespace Almondcove.Repositories
{
    public interface IBlogRepository
    {
        public Task<List<BlogsGet>> GetLatestBlogs(string category, string tag, int? year,string search);
        public Task<List<BlogAuthor>> GetBlogAuthors(int id);

        public Task<BlogDetailsGet> GetBlogDetailsBySlug(string slug);
        public Task<List<BlogCategory>> GetBlogCategories();
    }
}
