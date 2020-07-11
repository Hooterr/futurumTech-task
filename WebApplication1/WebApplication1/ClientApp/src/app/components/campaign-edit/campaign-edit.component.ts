import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CustomValidators } from '../../custom-validators/arrayValidators';
import { Campaign } from '../../models/Campaign';
import { CampaignsService } from '../../services/campaigns.service';

const keywordsOptions: string[] = ['cars', 'trains', 'planes', 'boats', 'cats'];


@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {
  cities: string[] = ['Kraków', 'Warszawa', 'Gdańsk', 'Wrocław', 'Opole'];

  campaignForm = this.fb.group({
    name: [null, [Validators.minLength(4), Validators.required]],
    keywords: [[], [CustomValidators.arrayMinLength(1)]],
    bidAmount: [null, [Validators.pattern('^[+-]?[0-9]+\.?[0-9]{0,2}$'), Validators.required, Validators.min(0.01)]],
    fund: [null, [Validators.pattern('^[+-]?[0-9]+\.?[0-9]{0,2}$'), Validators.required, Validators.min(0.01)]],
    status: [true],
    town: [null, [Validators.required]],
    radius: [null, [Validators.pattern('^[+-]?[0-9]+\.?[0-9]{0,2}$'), Validators.required, Validators.min(0.01)]]
  });

  get name() { return this.campaignForm.get('name'); }
  get keywords() { return this.campaignForm.get('keywords'); }
  get bidAmount() { return this.campaignForm.get('bidAmount'); }
  get fund() { return this.campaignForm.get('fund'); }
  get status() { return this.campaignForm.get('status'); }
  get town() { return this.campaignForm.get('town'); }
  get radius() { return this.campaignForm.get('radius'); }

  submited: boolean = false;
  creating: boolean = true;
  campaign: Campaign;
  busy: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private campaignService: CampaignsService,
    private router: Router
  ) {
  }
  
  ngOnInit() {
    const params: Params = this.route.snapshot.paramMap;

    if (!params.has('id')) {
      this.creating = true;
      return;
    }
    const campaignId = +params.get('id') || null;
    if (campaignId == null) {
      this.creating = true;
      return;
    }
    // TODO Get data
    this.creating = false;
  }

  deleteKeyword(keyword: string) {
    const removeAt = this.keywords.value.indexOf(keyword);
    if (removeAt > -1) {
      this.keywords.value.splice(removeAt, 1);
      this.keywords.updateValueAndValidity();
      this.keywords.markAsTouched();
    }
  }

  keywordSelected($event, keywordInput) {
    $event.preventDefault();
    keywordInput.value = '';

    const keyword = $event.item;
    if (this.keywords.value.includes(keyword))
      return;

    this.keywords.value.push(keyword);
    this.keywords.updateValueAndValidity();
    this.keywords.markAsTouched();
  }

  searchKeyword(text$: Observable<string>) {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : keywordsOptions.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )
  }

  onSubmit() {
    this.submited = true;
    if (this.campaignForm.invalid)
      return;

    if (this.creating) {
      this.busy = true;
      this.campaignService.create(this.campaignForm.value).subscribe(
        data => {
          console.log(data);
          this.busy = false;
          this.router.navigate(['campaigns'])
        },
        error => {
          console.log(error);
          this.busy = false;
        }
      )

    }

    
    /*console.log(this.name.errors);
    console.log(this.keywords.errors);
    console.log(this.bidAmount.errors);
    console.log(this.fund.errors);
    console.log(this.status.errors);
    console.log(this.town.errors);
    console.log(this.radius.errors);*/
  }
}
