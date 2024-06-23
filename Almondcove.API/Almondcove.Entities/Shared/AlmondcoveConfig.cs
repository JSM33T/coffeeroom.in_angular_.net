namespace Almondcove.Entities.Shared
{
    public class AlmondcoveConfig
    {
        public string ConnectionString { get; set; }
      
        public Cryptography Cryptography { get; set; }
    }

    public class Cryptography
    {
        public string Key { get; set; }
        public string IV { get; set; }
    }
}
