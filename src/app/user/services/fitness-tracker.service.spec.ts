import { TestBed } from '@angular/core/testing';

import { FitnessTrackerService } from './fitness-tracker.service';

describe('FitnessTrackerService', () => {
  let service: FitnessTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
