using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    /// <summary>
    /// Service to manage <see cref="Campaign"/>
    /// </summary>
    public interface ICampaignService
    {
        /// <summary>
        /// Gets campaign by id
        /// </summary>
        /// <param name="id">Campaign's id</param>
        /// <returns>Campaign as a DTO object or null if not found</returns>
        CampaignDTO Get(int id);

        /// <summary>
        /// Gets campaigns
        /// </summary>
        /// <returns>List of campaign DTOs</returns>
        IEnumerable<CampaignDTO> GetAll();

        /// <summary>
        /// Deletes a campaign by id
        /// </summary>
        /// <param name="id">Campaign's id</param>
        /// <returns>Result of the operation</returns>
        OperationResults Delete(int id);

        /// <summary>
        /// Creates a new campaign
        /// </summary>
        /// <param name="campaign">The campaign to create</param>
        /// <returns>Result of the operation</returns>
        int Create(CampaignDTO campaign);
        
        /// <summary>
        /// Updates a campaign
        /// </summary>
        /// <param name="campaign">The campaign to update</param>
        /// <returns>Result of the operation</returns>
        OperationResults Update(CampaignDTO campaign);
    }
}
