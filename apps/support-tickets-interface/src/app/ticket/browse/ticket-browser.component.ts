import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducer';
import { getTicketsState, TicketState } from '../ticket.reducer';
import { TicketService } from '../ticket.service';
import { IExistingSupportTicket } from '../types';
import { priorityColorMap } from '../constants';


@Component({
  selector: 'brightcomputing-ticket-browser',
  templateUrl: './ticket-browser.component.html',
  styleUrls: ['./ticket-browser.component.scss']
})
export class TicketBrowserComponent implements AfterViewInit {

  mobileDisplayedColumns: string[] = ['priority', 'title'];
  displayedColumns: string[] = ['id', ...this.mobileDisplayedColumns, 'status', 'description', 'email', 'refersTo'];


  @ViewChild(MatSort) sort: MatSort;
  tickets: MatTableDataSource<any>;
  
  ticketState: TicketState;
  constructor(
    private store: Store<fromRoot.State>, private activatedRoute: ActivatedRoute,
    private router: Router, private ticketService: TicketService) {
    this.store.select(getTicketsState)
      .subscribe((ticketState: TicketState) => {
        this.ticketState = ticketState;

        this.tickets = new MatTableDataSource(
          this.mapTicketsToMatTableDataSource(this.ticketState.tickets)
        );
      });
  }


  ngAfterViewInit(): void {
    this.sort.sort(<MatSortable>{id: 'priority', start: 'desc', disableClear: false});
    this.tickets.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tickets.filter = filterValue.trim().toLowerCase();
  }

  createNewTicket(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  goToTicketDetails(id: number): void {
    this.router.navigate([id], {relativeTo: this.activatedRoute});
  }

  private mapTicketsToMatTableDataSource(tickets: IExistingSupportTicket[]): Required<IExistingSupportTicket>[] {
    return tickets.map((ticket: IExistingSupportTicket) => ({
        ...ticket,
        priorityColor: priorityColorMap[Math.min(2, ticket.priority)]
    }));
  }

}

