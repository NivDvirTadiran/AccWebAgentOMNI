import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsBoardComponent } from './buttons-board.component';

describe('ButtonsBoardComponent', () => {
  let component: ButtonsBoardComponent;
  let fixture: ComponentFixture<ButtonsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
