import { TestBed } from '@angular/core/testing';

import { Toasterservice } from './toasterservice';

describe('Toasterservice', () => {
  let service: Toasterservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toasterservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
