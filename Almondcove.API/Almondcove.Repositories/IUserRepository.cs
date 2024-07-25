using Almondcove.Entities.Dedicated;
using Azure.Core;

namespace Almondcove.Repositories
{
    public interface IUserRepository
    {
        public Task<int> SignUpUser(User user);
        public Task<(int, UserClaims)> LoginUser(UserLoginRequest loginRequest);
        public Task<UserClaims> GetUserClaims(string Email);
        public Task<UserClaims> GetUserByEmailAndOtp(UserRecoveryRequest recoveryRequest);
        public Task<int> VerifyUser(UserVerifyRequest userVerifyRequest);
        public Task<bool> AddRecoveryEntry(string email, int otp, DateTime otpExpiration);

    }
}
