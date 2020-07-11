using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.DTOs
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<Campaign, CampaignDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CampaignId))
                .ForMember(dest => dest.Fund, opt => opt.MapFrom(src => src.CampaignFunds))
                .ReverseMap();            
        }
    }
}
