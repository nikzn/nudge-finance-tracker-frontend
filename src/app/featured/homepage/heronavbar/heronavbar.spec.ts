import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heronavbar } from './heronavbar';

describe('Heronavbar', () => {
  let component: Heronavbar;
  let fixture: ComponentFixture<Heronavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heronavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Heronavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
