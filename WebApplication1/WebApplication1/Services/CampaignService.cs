using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Services;

namespace WebApplication1
{
    public class CampaignService : ICampaignService
    {
        private readonly ApplicationDataContext _db;
        private IMapper _mapper;
        public CampaignService(IMapper mapper, ApplicationDataContext db)
        {
            _db = db;
            _mapper = mapper;
        }
        public OperationResults Delete(int id)
        {
            var entity = _db.Campaigns.Find(id);
            if (entity == null)
                return OperationResults.NotFound;

            _db.Entry(entity).State = EntityState.Deleted;

            try
            {
                _db.SaveChanges();
            }
            catch
            {
                return OperationResults.Fail;
            }

            return OperationResults.Success;
        }

        public int Create(CampaignDTO campaign)
        {
            var campaignEntity = _mapper.Map<Campaign>(campaign);
            campaignEntity.CampaignId = 0;
            _db.Add(campaignEntity);
            _db.SaveChanges();
            return campaignEntity.CampaignId;
        }



        public CampaignDTO Get(int id)
        {
            var campaign = _db.Campaigns.Find(id);

            if (campaign == null)
                return null;

            return _mapper.Map<CampaignDTO>(campaign);
        }

        public IEnumerable<CampaignDTO> GetAll()
        {
            return _db.Campaigns
                .ToList()
                .Select(x => _mapper.Map<CampaignDTO>(x))
                .ToList();
        }

        public OperationResults Update(CampaignDTO campaign)
        {
            var entity = _db.Campaigns.Find(campaign.Id);
            if (entity == null)
                return OperationResults.NotFound;

            _mapper.Map(campaign, entity);
            _db.Entry(entity).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                return OperationResults.Fail;
            }

            return OperationResults.Success;
        }
    }
}
