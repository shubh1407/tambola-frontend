import { TestBed } from '@angular/core/testing';

import { LeadServiceService } from './lead-service.service';

describe('LeadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadServiceService = TestBed.get(LeadServiceService);
    expect(service).toBeTruthy();
  });
});
