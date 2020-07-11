import { TestBed } from '@angular/core/testing';

import { CampaignsService } from './campaigns-service.service';

describe('CampaignsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampaignsService = TestBed.get(CampaignsService);
    expect(service).toBeTruthy();
  });
});
