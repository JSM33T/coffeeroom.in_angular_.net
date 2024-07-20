namespace Almondcove.Entities.Dedicated
{
    public class BlogsGet
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public DateTime DateAdded { get; set; }
        public List<BlogAuthor> Authors { get; set; } = [];
    }

}
