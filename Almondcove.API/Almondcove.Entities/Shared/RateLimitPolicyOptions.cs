using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Shared
{
    public class RateLimitPolicyOptions
    {
        public int PermitLimit { get; set; }
        public TimeSpan Window { get; set; }
        public int QueueLimit { get; set; }
    }
}
