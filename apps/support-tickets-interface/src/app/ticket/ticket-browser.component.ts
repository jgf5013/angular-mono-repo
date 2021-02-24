import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from './ticket.service';

@Component({
  selector: 'brightcomputing-ticket-browser',
  templateUrl: './ticket-browser.component.html',
  styleUrls: ['./ticket-browser.component.scss']
})
export class TicketBrowserComponent {

  displayedColumns: string[] = ['id', 'title', 'status', 'description', 'priority', 'email', 'refersTo'];
  colorMap: any = {
    0: 'black',
    1: 'black',
    2: 'orange',
    3: 'red'
  };

  @ViewChild(MatSort) sort: MatSort;
  tickets: MatTableDataSource<any>;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ticketService: TicketService) {
    this.ticketService.getTickets()
    .subscribe((tickets: any[]) => {
      this.tickets = new MatTableDataSource(tickets);
      this.tickets.sort = this.sort;
    })
  }

  createNewTicket() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }


}

