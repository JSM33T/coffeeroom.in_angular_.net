namespace Almondcove.Entities.Dedicated
{
    public class UserAddRequest
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
        public int OTP { get; set; }
    }
}
