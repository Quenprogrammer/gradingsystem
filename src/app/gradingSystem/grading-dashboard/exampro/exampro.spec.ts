import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exampro } from './exampro';

describe('Exampro', () => {
  let component: Exampro;
  let fixture: ComponentFixture<Exampro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exampro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exampro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
