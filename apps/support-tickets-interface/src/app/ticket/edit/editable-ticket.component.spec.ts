import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTicketComponent } from './editable-ticket.component';

describe('EditableTicketComponent', () => {
  let component: EditableTicketComponent;
  let fixture: ComponentFixture<EditableTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
