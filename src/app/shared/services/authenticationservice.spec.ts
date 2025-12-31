import { TestBed } from '@angular/core/testing';

import { Authenticationservice } from './authenticationservice';

describe('Authenticationservice', () => {
  let service: Authenticationservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authenticationservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
