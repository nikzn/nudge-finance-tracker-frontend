import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTransactions } from './add-edit-transactions';

describe('AddEditTransactions', () => {
  let component: AddEditTransactions;
  let fixture: ComponentFixture<AddEditTransactions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTransactions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTransactions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
