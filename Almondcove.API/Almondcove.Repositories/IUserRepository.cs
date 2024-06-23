using Almondcove.Entities.Dedicated;

namespace Almondcove.Repositories
{
    public interface IUserRepository
    {
        public Task<int> SignUpUser(User user);
    }
}
