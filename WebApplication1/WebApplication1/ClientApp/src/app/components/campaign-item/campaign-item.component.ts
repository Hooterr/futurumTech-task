import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Campaign } from '../../models/Campaign';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.css']
})
export class CampaignItemComponent implements OnInit {

  @Input() campaign: Campaign;
  @Output() deleteCampaign: EventEmitter<Campaign> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onDeleteCampaign(campaign: Campaign) {
    this.deleteCampaign.emit(campaign);
  }

}
