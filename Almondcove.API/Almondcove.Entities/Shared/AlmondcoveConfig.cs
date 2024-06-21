namespace Almondcove.Entities.Shared
{
    public class AlmondcoveConfig
    {
        public string ConnectionString { get; set; }
      
        public CollecConfig Collec { get; set; }
    }

    public class CollecConfig
    {
        public bool Collec1 { get; set; }
        public int Collec2 { get; set; }
    }
}
