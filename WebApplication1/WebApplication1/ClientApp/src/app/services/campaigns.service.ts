import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/Campaign';

// Service to manage campaign operations
@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  // Base URL of the API server
  private baseUrl: string;

  // Campaigns API endpoint
  private campaignsEndpoint: string = 'api/campaigns'

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Gets all campaigns
  public getAll(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.baseUrl}${this.campaignsEndpoint}`);
  }

  // Gets campaign by ID
  public get(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.baseUrl}${this.campaignsEndpoint}/${id}`);
  }

  // Creates a campaign
  public create(campaign: Campaign): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.campaignsEndpoint}`, campaign);
  }

  // Updates a campaign
  public update(campaign: Campaign): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${this.campaignsEndpoint}/${campaign.id}`, campaign);
  }

  // Deletes a campaign
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.campaignsEndpoint}/${id}`);
  }

}
