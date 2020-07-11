import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../models/Campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private baseUrl: string;
  private campaignsEndpoint: string = 'api/campaigns'

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getAll(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.baseUrl}${this.campaignsEndpoint}`);
  }

  public get(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.baseUrl}${this.campaignsEndpoint}/${this.baseUrl}`);
  }

  public create(campaign: Campaign): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.campaignsEndpoint}`, campaign);
  }

  public update(campaign: Campaign): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${this.campaignsEndpoint}`, campaign);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.campaignsEndpoint}/${id}`);
  }

}
