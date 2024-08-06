import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelWinBtnComponent } from './tel-win-btn.component';

describe('TelWinBtnComponent', () => {
  let component: TelWinBtnComponent;
  let fixture: ComponentFixture<TelWinBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelWinBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelWinBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
