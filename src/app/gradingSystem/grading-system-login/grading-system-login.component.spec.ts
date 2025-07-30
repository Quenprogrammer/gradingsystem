import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingSystemLoginComponent } from './grading-system-login.component';

describe('GradingSystemLoginComponent', () => {
  let component: GradingSystemLoginComponent;
  let fixture: ComponentFixture<GradingSystemLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradingSystemLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradingSystemLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
