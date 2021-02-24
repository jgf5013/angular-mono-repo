import { Component, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'brightcomputing-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

  title: string;
  description: string;
  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
  }

  saveTicket(): void {
    const ticket = {
      title: "Feature `download` doesn't work",
      description: "The feature `download` in the main page of the website doesn't seems to work. The browser crashes after clicking the download button.",
      priority: 2,
      email: "user1@example.org",
      refersTo: [1, 2]
    }
    this.ticketService.postTicket(ticket);
  }
}
