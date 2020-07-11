import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campaign } from '../../models/Campaign';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css']
})
export class CampaignItemComponent implements OnInit {

  // The campaign to display
  @Input() campaign: Campaign;

  // Delete event
  @Output() deleteCampaign: EventEmitter<Campaign> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // Delete campaign
  onDeleteCampaign(campaign: Campaign) {
    // Fire the event
    this.deleteCampaign.emit(campaign);
  }

}
