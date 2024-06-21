using Almondcove.Entities.Dedicated;

namespace Almondcove.Repositories
{
    public interface IMailingListRepository
    {
        Task<int> AddMailingListAsync(MailingList mailingList);
    }
}
