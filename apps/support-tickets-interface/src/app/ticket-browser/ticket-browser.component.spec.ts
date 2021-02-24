import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBrowserComponent } from './ticket-browser.component';

describe('TicketBrowserComponent', () => {
  let component: TicketBrowserComponent;
  let fixture: ComponentFixture<TicketBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
