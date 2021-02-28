import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducer';
import * as TicketActions from './ticket/ticket.actions';
import { getTicketsState, TicketState } from './ticket/ticket.reducer';




@Component({
  selector: 'brightcomputing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ticketState: TicketState;
  stateLoaded = true;
  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(TicketActions.loadTickets());
  }
  ngOnInit(): void {
    this.store.select(getTicketsState)
      .subscribe((ticketState: TicketState) => {
        this.ticketState = ticketState;
        this.stateLoaded = true;
      });
  }
}
