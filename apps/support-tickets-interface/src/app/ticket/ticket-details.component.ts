import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from './ticket.service';

@Component({
  selector: 'brightcomputing-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent {

  ticket: Observable<any>;
  constructor(private route: ActivatedRoute, private ticketService: TicketService) {
    this.route.params.subscribe((param: any) => {
      this.ticket = this.ticketService.getTicket(param.ticketId);
    });
  }


}
