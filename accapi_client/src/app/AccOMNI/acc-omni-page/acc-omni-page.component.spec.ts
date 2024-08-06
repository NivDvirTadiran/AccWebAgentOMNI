import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccOmniPageComponent } from './acc-omni-page.component';

describe('AccOMNIPageComponent', () => {
  let component: AccOmniPageComponent;
  let fixture: ComponentFixture<AccOmniPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccOmniPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccOmniPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
