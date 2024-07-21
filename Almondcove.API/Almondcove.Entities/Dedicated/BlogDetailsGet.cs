namespace Almondcove.Entities.Dedicated
{
    public class BlogDetailsGet
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ContentMD { get; set; }
        public List<BlogAuthor> Authors{ get; set; }
        public DateTime DateAdded { get; set; }
    }
}
