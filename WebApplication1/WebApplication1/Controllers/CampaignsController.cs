using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    /// <summary>
    /// API controller to manage campaigns
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignsController : ControllerBase
    {

        #region Construction
        private readonly ICampaignService _campaigns;

        public CampaignsController(ICampaignService campaigns)
        {
            _campaigns = campaigns;
        } 

        #endregion

        /// <summary>
        /// Gets a campaign by ID
        /// </summary>
        /// <param name="id">Campaign's id</param>
        /// <returns>Result of the operation according to RESTful standard</returns>
        [HttpGet("{id}")]
        public ActionResult<CampaignDTO> Get(int id)
        {
            var result = _campaigns.Get(id);
            if (result == null)
                return NotFound(null);

            return result;
        }

        /// <summary>
        /// Creates a new campaign according to the model
        /// </summary>
        /// <param name="campaign">The model of the campaign to create</param>
        /// <returns>Result of the operation according to RESTful standard</returns>
        [HttpPost]
        public ActionResult Create(CampaignDTO campaign)
        {
            var newId = _campaigns.Create(campaign);
            if (newId == -1)
                return BadRequest();

            return CreatedAtAction(nameof(Get), new { id = newId });
        }

        /// <summary>
        /// Updates an existing campaign
        /// </summary>
        /// <param name="id">The id of the campaign</param>
        /// <param name="campaign">New model of the campaign</param>
        /// <returns>Result of the operation according to RESTful standard</returns>
        [HttpPut("{id}")]
        public ActionResult Update(int id, CampaignDTO campaign)
        {
            if (id != campaign.Id)
                return BadRequest();


            return _campaigns.Update(campaign) switch
            {
                OperationResults.Fail       => BadRequest(),
                OperationResults.Success    => NoContent(),
                OperationResults.NotFound   => NotFound(),
                _                           => throw new NotImplementedException(),
            };
        }
        /// <summary>
        /// Deletes an existing campaign
        /// </summary>
        /// <param name="id">Campaign's id</param>
        /// <returns>Result of the operation according to RESTful standard</returns>
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return _campaigns.Delete(id) switch
            {
                OperationResults.NotFound   => NotFound(),
                OperationResults.Fail       => BadRequest(),
                OperationResults.Success    => NoContent(),
                _                           => throw new NotImplementedException()
            };
        }

        /// <summary>
        /// Gets all campaigns 
        /// </summary>
        /// <returns>Result of the operation according to RESTful standard</returns>
        [HttpGet]
        public IEnumerable<CampaignDTO> GetAll()
        {
            var result = _campaigns.GetAll();
            return result;
        }
    }
}
