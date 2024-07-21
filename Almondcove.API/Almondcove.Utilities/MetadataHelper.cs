using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Text;
using System.Threading.Tasks;

namespace Almondcove.Utilities
{
   

    public class SystemConfig
    {
        public string FrameworkVersion { get; set; }
        public string Environment { get; set; }
        public string OSDescription { get; set; }
        public string OSArchitecture { get; set; }
        public string ProcessArchitecture { get; set; }
        public string MachineName { get; set; }
        public string RuntimeVersion { get; set; }
        // Add other system configurations as needed
    }


    public class CustomObject
    {
        public ApiMeta apiMeta { get; set; }
        public SystemConfig Config { get; set; }
        public string UserAgent { get; set; }
        public DateTime RequestTime { get; set; }
    }
    public class ApiMeta
    {
        public string ApiName { get; set; }
        public string Ver { get; set; }
        public string Author { get; set; }
    }

    public class MetadataHelper
    {
        public static CustomObject GetMetadata(IActionDescriptorCollectionProvider actionDescriptorCollectionProvider, IConfiguration configuration, IWebHostEnvironment environment, string userAgent, DateTime requestTime)
        {
           
            var customObject = new CustomObject
            {
                UserAgent = userAgent,
                RequestTime = requestTime
            };

            customObject.apiMeta = new ApiMeta {
            
                ApiName = "Almondcove.API",
                Ver = "2.0.0",
                Author = "Jasmeet Singh"
            };

            customObject.Config = new SystemConfig
            {
                FrameworkVersion = Assembly.GetExecutingAssembly().GetCustomAttribute<TargetFrameworkAttribute>()?.FrameworkName,
                Environment = environment.EnvironmentName,
                OSDescription = RuntimeInformation.OSDescription,
                OSArchitecture = RuntimeInformation.OSArchitecture.ToString(),
                ProcessArchitecture = RuntimeInformation.ProcessArchitecture.ToString(),
                MachineName = Environment.MachineName,
                RuntimeVersion = RuntimeInformation.FrameworkDescription
                // Add other system configurations as needed
            };

            return customObject;
        }
    }

}
