﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Dedicated
{
    public class UserVerifyRequest
    {
        public string Email { get; set; }
        public int OTP { get; set; }
    }
}
