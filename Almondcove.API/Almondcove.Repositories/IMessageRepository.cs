using Almondcove.Entities.Dedicated;

namespace Almondcove.Repositories
{
    public interface IMessageRepository
    {
        Task<int> AddMessage(Message mailingList);
    }
}
