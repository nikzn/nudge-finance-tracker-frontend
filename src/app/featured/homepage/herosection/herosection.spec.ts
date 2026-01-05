import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { provideRouter } from '@angular/router';

import { Herosection } from './herosection';

describe('Herosection', () => {
  let component: Herosection;
  let fixture: ComponentFixture<Herosection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Herosection],
      providers: [
        provideRouter([]), // ✅ FIXES ActivatedRoute error
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Herosection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct stats', () => {
    expect(component.stats).toEqual([
      { value: '50K+', label: 'Active Users' },
      { value: '$2M+', label: 'Tracked' },
      { value: '30%', label: 'Avg. Savings' },
      { value: '98%', label: 'Satisfaction' },
    ]);
  });
});
