﻿namespace Almondcove.Entities.Dedicated
{
    public class UserClaims
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Avatar { get; set; }
        public string Token { get; set; }
    }
}
