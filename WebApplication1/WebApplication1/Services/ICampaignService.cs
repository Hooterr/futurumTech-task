using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public interface ICampaignService
    {
        CampaignDTO Get(int id);
        IEnumerable<CampaignDTO> GetAll();
        OperationResults Delete(int id);
        int Create(CampaignDTO campaign);
        OperationResults Update(CampaignDTO campaign);
    }
}
