import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../models/Campaign';
import { CampaignsService } from '../../services/campaigns.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  // List of all campaigns
  campaigns: Campaign[];

  constructor(private campaignsService: CampaignsService) { }

  ngOnInit() {
    // Get the campaigns from the server
    this.campaignsService.getAll().subscribe(
      (data: Campaign[]) => {
        this.campaigns = data;
      },
      error => { }
    );
  }

  onDeleteCampaign(campaign: Campaign) {
    // Delete campaign from the server
    this.campaignsService.delete(campaign.id).subscribe(
      (data) => {
        this.campaigns.splice(this.campaigns.indexOf(campaign), 1);
      },
      (error) => { }
    );
  }
}
