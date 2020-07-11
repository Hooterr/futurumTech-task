using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    public class Campaign
    {
        [Key]
        public int CampaignId { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 4)]
        public string Name { get; set; }
        [Required]
        [MinLength(1)]
        public string[] Keywords { get; set; }
        [Required]
        public decimal BidAmount { get; set; }
        [Required]
        public decimal CampaignFunds { get; set; }
        [Required]
        public bool Status { get; set; }
        [Required]
        public string Town { get; set; }
        [Required]
        public double Radius { get; set; } 
    }
}
