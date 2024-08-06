import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccAgentPage } from './acc-agent-page.component';

describe('StatusBoardComponent', () => {
  let component: AccAgentPage;
  let fixture: ComponentFixture<AccAgentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccAgentPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
