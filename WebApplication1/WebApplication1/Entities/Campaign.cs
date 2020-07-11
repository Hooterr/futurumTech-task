using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    /// <summary>
    /// Entity representing a campaign
    /// </summary>
    public class Campaign
    {
        /// <summary>
        /// Id of the object
        /// </summary>
        [Key]
        public int CampaignId { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 4)]
        public string Name { get; set; }
       
        /// <summary>
        /// Keywords associated with this campaign
        /// </summary>
        [Required]
        [MinLength(1)]
        public string[] Keywords { get; set; }

        /// <summary>
        /// Bid amount associated with this campaign
        /// </summary>
        [Required]
        public decimal BidAmount { get; set; }
        
        /// <summary>
        /// Funds for this campaign
        /// </summary>
        [Required]
        public decimal CampaignFunds { get; set; }
        
        /// <summary>
        /// Status of this campaign
        /// True if ON, false if OFF
        /// </summary>
        [Required]
        public bool Status { get; set; }

        /// <summary>
        /// The town campaign takes place
        /// </summary>
        [Required]
        public string Town { get; set; }

        /// <summary>
        /// The radius of the area from the town that the campaign may take place
        /// </summary>
        [Required]
        public double Radius { get; set; } 
    }
}
