import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { CustomValidators } from '../../custom-validators/arrayValidators';
import { Campaign } from '../../models/Campaign';
import { CampaignsService } from '../../services/campaigns.service';

// Available keywords
const keywordsOptions: string[] = ['cars', 'trains', 'planes', 'boats', 'cats'];


@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  // Available cities
  cities: string[] = ['Kraków', 'Warszawa', 'Gdańsk', 'Wrocław', 'Opole'];

  // Campaign form
  campaignForm = this.fb.group({
    id: [0, [Validators.required]],
    name: [null, [Validators.minLength(4), Validators.required]],
    keywords: [[], [CustomValidators.arrayMinLength(1)]],
    bidAmount: [null, [Validators.pattern('^[+-]?[0-9]+\.?[0-9]{0,2}$'), Validators.required, Validators.min(0.01)]],
    fund: [null, [Validators.pattern('^[+-]?[0-9]+\.?[0-9]{0,2}$'), Validators.required, Validators.min(0.01)]],
    status: [true],
    town: [null, [Validators.required]],
    radius: [null, [Validators.pattern('^[+-]?[0-9]+\.?[0-9]{0,2}$'), Validators.required, Validators.min(0.01)]]
  });

  // Getters for each control in the campaign form
  get name() { return this.campaignForm.get('name'); }
  get keywords() { return this.campaignForm.get('keywords'); }
  get bidAmount() { return this.campaignForm.get('bidAmount'); }
  get fund() { return this.campaignForm.get('fund'); }
  get status() { return this.campaignForm.get('status'); }
  get town() { return this.campaignForm.get('town'); }
  get radius() { return this.campaignForm.get('radius'); }

  // Indicates if the form was ever submitted
  // Used to display error messages after the user click submit
  submited: boolean = false;

  // Indicates if the submit request should create a new campaign or edit existing
  creating: boolean = true;

  // Campaign being edited, if creating this stays null
  campaign: Campaign;

  // Indicates if the component is busy (submiting form)
  busy: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private campaignService: CampaignsService,
    private router: Router,
  ) {
  }
  
  ngOnInit() {
    // campaign/edit/id
    const params: Params = this.route.snapshot.paramMap;
    
    // Check if the id exists in the path
    if (!params.has('id')) {
      // The path was in /campaign/edit format 
      this.creating = true;
      return;
    }

    const campaignId = +params.get('id') || null;
    if (campaignId == null) {
      // Creating a new campaign
      this.creating = true;
      return;
    }

    // Editing an existing campaign
    this.creating = false;

    // Get the campaign from the server
    this.campaignService.get(campaignId).subscribe(
      (campaign: Campaign) => {
        // Update the form
        this.campaignForm.setValue(campaign);
      },
      (error: any) => {
        // Go back to all campaigns
        // TODO make 404 page
        this.router.navigate(['/campaigns']);
      });
  }

  // Deletes a specific keyword from campaign's keywords
  deleteKeyword($event, keyword: string) {

    const removeAt = this.keywords.value.indexOf(keyword);
    if (removeAt > -1) {
      this.keywords.value.splice(removeAt, 1);

      // For the field's validators to trigger
      this.keywords.updateValueAndValidity();
      // For the validation message to appear
      this.keywords.markAsTouched();
    }
  }

  // Fired when a keyword is selected from the type-ahead list
  keywordSelected($event, keywordInput) {

    // Handle the event here
    $event.preventDefault();

    // Reset the input text
    keywordInput.value = '';

    // Get the keyword that was selected
    const keyword = $event.item;
    // If the keyword has already been added return
    if (this.keywords.value.includes(keyword))
      return;

    // Add new keyword to the array
    this.keywords.value.push(keyword);
    // For validation to trigger
    this.keywords.updateValueAndValidity();
    // For error message to appear
    this.keywords.markAsTouched();
  }

  // On keywords input focus
  // Makes available options for the keywords appear 
  public onFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }

  // Typeahead search
  searchKeyword(text$: Observable<string>) {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length <= 2),
      map(term => keywordsOptions.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )
  }

  // Submit form
  onSubmit() {

    this.submited = true;
    if (this.campaignForm.invalid)
      return;

    this.busy = true;

    if (this.creating) {
      // Creating a new campaign
      this.campaignService.create(this.campaignForm.value).subscribe(
        data => {
          this.busy = false;
          this.router.navigate(['campaigns'])
        },
        error => {
          this.busy = false;
        }
      )

    }
    else {
      // Editing an existing campaign
      this.campaignService.update(this.campaignForm.value).subscribe(
        reponse => {
          this.busy = false;
          this.router.navigate(['campaigns'])
        },
        error => {
          this.busy = false;
        });
    }
  }
}
