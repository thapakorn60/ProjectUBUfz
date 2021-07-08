import { TestBed } from '@angular/core/testing';

import { JoinsService } from './joins.service';

describe('JoinsService', () => {
  let service: JoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
