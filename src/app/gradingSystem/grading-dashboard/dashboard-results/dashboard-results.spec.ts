import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResults } from './dashboard-results';

describe('DashboardResults', () => {
  let component: DashboardResults;
  let fixture: ComponentFixture<DashboardResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
