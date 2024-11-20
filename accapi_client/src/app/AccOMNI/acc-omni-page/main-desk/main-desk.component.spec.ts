import { ComponentFixture, TestBed } from '@angular/core/testing';

import {MainDeskComponent} from './main-desk.component';

describe('ModalComponent', () => {
  let component: MainDeskComponent;
  let fixture: ComponentFixture<MainDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDeskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
