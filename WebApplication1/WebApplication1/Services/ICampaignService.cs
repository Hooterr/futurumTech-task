using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public interface ICampaignService
    {
        CampaignDTO Get(int id);
        IEnumerable<CampaignDTO> GetAll();
        bool Delete(int id);
        int Create(CampaignDTO campaign);
        bool Update(CampaignDTO campaign);
    }
}
