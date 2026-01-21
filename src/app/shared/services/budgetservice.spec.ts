import { TestBed } from '@angular/core/testing';

import { Budgetservice } from './budgetservice';

describe('Budgetservice', () => {
  let service: Budgetservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Budgetservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
