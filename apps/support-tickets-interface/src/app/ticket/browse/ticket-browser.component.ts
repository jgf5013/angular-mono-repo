import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducer';
import { priorityColorMap } from '../constants';
import { getTicketsState, TicketState } from '../ticket.reducer';
import { IExistingSupportTicket } from '../types';


@Component({
  selector: 'brightcomputing-ticket-browser',
  templateUrl: './ticket-browser.component.html',
  styleUrls: ['./ticket-browser.component.scss']
})
export class TicketBrowserComponent implements OnInit {

  mobileDisplayedColumns: string[] = ['priority', 'title'];
  displayedColumns: string[] = ['id', ...this.mobileDisplayedColumns, 'status', 'description', 'email', 'refersTo'];


  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ticketState: TicketState;
  tableLoaded: boolean;
  constructor(
    private store: Store<fromRoot.State>, private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.listenToTicketState();
  }
  ngOnInit(): void {
    this.sort.sort(<MatSortable>{
      id: 'priority',
      start: 'desc'
    });
    this.dataSource.sort = this.sort;
  }

  listenToTicketState() {

    this.store.select(getTicketsState)
      .subscribe((ticketState: TicketState) => {
        this.ticketState = ticketState;

        this.dataSource.data = this.mapTicketsToMatTableDataSource(this.ticketState.tickets);
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

