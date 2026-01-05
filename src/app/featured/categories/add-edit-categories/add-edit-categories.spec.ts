import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategories } from './add-edit-categories';

describe('AddEditCategories', () => {
  let component: AddEditCategories;
  let fixture: ComponentFixture<AddEditCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
