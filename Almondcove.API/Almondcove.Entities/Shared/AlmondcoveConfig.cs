namespace Almondcove.Entities.Shared
{
    public class AlmondcoveConfig
    {
        public string Setting1 { get; set; }
        public string Setting2 { get; set; }
        public CollecConfig Collec { get; set; }
    }

    public class CollecConfig
    {
        public bool Collec1 { get; set; }
        public int Collec2 { get; set; }
    }
}
