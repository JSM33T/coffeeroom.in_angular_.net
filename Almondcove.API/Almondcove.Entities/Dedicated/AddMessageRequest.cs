using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Entities.Dedicated
{
    public class AddMessageRequest
    {
        public string Name { get; set; }
        public string Mail { get; set; }
        public string MessageText { get; set; }
        public string Topic { get; set; } = "general";
    }
}
