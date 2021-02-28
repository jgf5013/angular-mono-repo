import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from '../ticket.service';
import { IExistingSupportTicket, INewSupportTicket } from '../types';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducer';
import { getTicketsState, TicketState } from '../ticket.reducer';


@Component({
  selector: 'brightcomputing-ticket-browser',
  templateUrl: './ticket-browser.component.html',
  styleUrls: ['./ticket-browser.component.scss']
})
export class TicketBrowserComponent implements AfterViewInit {

  mobileDisplayedColumns: string[] = ['priority', 'title'];
  displayedColumns: string[] = ['id', 'status', 'description', 'email', 'refersTo', ...this.mobileDisplayedColumns];
  colorMap: any = {
    0: 'black',
    1: 'black',
    2: 'orange',
    3: 'red'
  };

  @ViewChild(MatSort) sort: MatSort;
  tickets: MatTableDataSource<any>;
  
  ticketState: TicketState;
  constructor(
    private store: Store<fromRoot.State>, private activatedRoute: ActivatedRoute,
    private router: Router, private ticketService: TicketService) {
    this.store.select(getTicketsState)
      .subscribe((ticketState: TicketState) => {
        this.ticketState = ticketState;

        this.tickets = new MatTableDataSource(this.ticketState.tickets);
      });
  }


  ngAfterViewInit() {
    this.sort.sort({id: 'priority', start: 'desc', disableClear: false});
    this.tickets.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tickets.filter = filterValue.trim().toLowerCase();
  }

  createNewTicket() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  goToTicketDetails(id: number) {
    this.router.navigate([id], {relativeTo: this.activatedRoute});
  }

}

