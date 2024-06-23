namespace Almondcove.Services
{
    public interface ICryptoService
    {
        public Task<string> Encrypt(string Input);
        public Task<string> Decrupt(string Input);
    }
}
