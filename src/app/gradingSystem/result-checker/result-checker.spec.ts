import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultChecker } from './result-checker';

describe('ResultChecker', () => {
  let component: ResultChecker;
  let fixture: ComponentFixture<ResultChecker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultChecker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultChecker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
