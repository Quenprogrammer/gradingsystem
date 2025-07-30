import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingDashboardComponent } from './grading-dashboard.component';

describe('GradingDashboardComponent', () => {
  let component: GradingDashboardComponent;
  let fixture: ComponentFixture<GradingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
