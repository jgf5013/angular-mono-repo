import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TicketService } from './ticket.service';

@Component({
  selector: 'brightcomputing-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent {

  title: string = '';
  description: string = '';
  DEFAULT_PRIORITY: number = 1;
  emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
  ]);
  descriptionFormControl = new FormControl('');
  titleFormControl = new FormControl('');
  constructor(private ticketService: TicketService) { }

  saveTicket(): void {
    console.log('emailFormControl: ', this.emailFormControl);
    const ticket = {
      title: this.titleFormControl.value,
      description: this.descriptionFormControl.value,
      priority: this.DEFAULT_PRIORITY,
      email: this.emailFormControl.value,
      refersTo: [1, 2]
    }
    this.ticketService.postTicket(ticket);
  }
}
