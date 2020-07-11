using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    /// <summary>
    /// DTO object for <see cref="Campaign"/>
    /// </summary>
    public class CampaignDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Keywords { get; set; }
        public decimal BidAmount { get; set; }
        public decimal Fund { get; set; }
        public bool Status { get; set; }
        public string Town { get; set; }
        public double Radius { get; set; }
    }
}
