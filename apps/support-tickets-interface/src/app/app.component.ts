import { Component } from '@angular/core';
import { TicketService } from './ticket/ticket.service';
import { IExistingSupportTicket } from './ticket/types';

@Component({
  selector: 'brightcomputing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  numberOfTickets: number;
  constructor(private ticketService: TicketService) {
    this.ticketService.getTickets().subscribe((tickets: IExistingSupportTicket[]) => {
      this.numberOfTickets = tickets.length;
    });
  }
}
