import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from './ticket.service';

@Component({
  selector: 'brightcomputing-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {

  ticket: Observable<any>;
  constructor(private route: ActivatedRoute, private ticketService: TicketService) {
    this.route.params.subscribe((param: any) => {
      
      this.ticket = this.ticketService.getTicket(param.ticketId);
    });
  }


}
