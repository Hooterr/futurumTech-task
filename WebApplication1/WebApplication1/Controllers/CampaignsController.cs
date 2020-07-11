using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignsController : ControllerBase
    {

        private readonly ICampaignService _campaigns;

        public CampaignsController(ICampaignService campaigns)
        {
            _campaigns = campaigns;
        }

        [HttpGet("{id}")]
        public ActionResult<CampaignDTO> Get(int id)
        {
            var result = _campaigns.Get(id);
            if (result == null)
                return NotFound(null);

            return result;
        }

        [HttpPost]
        public ActionResult Create(CampaignDTO campaign)
        {
            var newId = _campaigns.Create(campaign);
            if (newId == -1)
                return BadRequest();

            return CreatedAtAction(nameof(Get), new { id = newId });
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, CampaignDTO campaign)
        {
            if (id != campaign.Id)
                return BadRequest();

            // TODO return not found when not found
            var success = _campaigns.Update(campaign);
            if (!success)
                return BadRequest();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (_campaigns.Delete(id))
                return NoContent();

            return NotFound();
        }

        [HttpGet]
        public IEnumerable<CampaignDTO> GetAll()
        {
            var result = _campaigns.GetAll();
            return result;
        }
    }
}
