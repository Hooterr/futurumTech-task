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
      data => console.log(data),
      error => console.log(error)
    );
    this.campaigns = [
      {
        id: 1,
        name: 'test1',
        bidAmount: 222.22,
        fund: 11.11,
        keywords: ['idk', 'idk2', 'idk3'],
        radius: 222.22,
        status: false,
        town: 'New York',
      },
      {
        id: 2,
        name: 'test2',
        bidAmount: 12.333,
        fund: 12.34,
        keywords: ['idk', 'idk3'],
        radius: 121,
        status: true,
        town: 'Los Angeles',
      }
    ];
  }

}
