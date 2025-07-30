import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeVsExpensisComponent } from './income-vs-expensis.component';

describe('IncomeVsExpensisComponent', () => {
  let component: IncomeVsExpensisComponent;
  let fixture: ComponentFixture<IncomeVsExpensisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeVsExpensisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeVsExpensisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
