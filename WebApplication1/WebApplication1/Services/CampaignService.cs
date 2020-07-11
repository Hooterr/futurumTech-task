using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
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
        public bool Delete(int id)
        {
            var entity = new Campaign()
            {
                CampaignId = id,
            };
            _db.Entry(entity).State = EntityState.Deleted;

            try
            {
                _db.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
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

        public bool Update(CampaignDTO campaign)
        {
            var campaignEntity = _mapper.Map<Campaign>(campaign);

            _db.Entry(campaignEntity).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}
