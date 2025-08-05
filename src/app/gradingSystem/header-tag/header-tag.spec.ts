import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTag } from './header-tag';

describe('HeaderTag', () => {
  let component: HeaderTag;
  let fixture: ComponentFixture<HeaderTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
