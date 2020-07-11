import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../models/Campaign';
import { CampaignsService } from '../../services/campaigns.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaigns: Campaign[];

  constructor(private campaignsService: CampaignsService) { }

  ngOnInit() {
    this.campaignsService.getAll().subscribe(
      (data: Campaign[]) => {
        console.log(data)
        this.campaigns = data;
      },
      error => console.log(error)
    );
  }

  onDeleteCampaign(campaign: Campaign) {
    this.campaignsService.delete(campaign.id).subscribe(
      (data) => {
        console.log(data)
        this.campaigns.splice(this.campaigns.indexOf(campaign), 1);
      },
      (error) => console.log(error));
  }
}
