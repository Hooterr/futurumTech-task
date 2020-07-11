import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { CampaignEditComponent } from './components/campaign-edit/campaign-edit.component';
import { CampaignItemComponent } from './components/campaign-item/campaign-item.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CounterComponent } from './counter/counter.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    CampaignItemComponent,
    CampaignListComponent,
    CampaignEditComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
      { path: 'campaigns', component: CampaignListComponent},
      { path: 'campaigns/edit', component: CampaignEditComponent },
      { path: 'campaigns/edit/:id', component: CampaignEditComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
