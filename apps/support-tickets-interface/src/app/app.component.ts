import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducer';
import * as TicketActions from './ticket/ticket.actions';
import { getTicketsState, TicketState } from './ticket/ticket.reducer';
import { ActivatedRoute, Event, Router, UrlSegment } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'brightcomputing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ticketState: TicketState;
  stateLoaded = true;
  breadCrumbs: string[];
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute, private router: Router) {
    this.store.dispatch(TicketActions.loadTickets());
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart)
    )
    .subscribe((navigationStart: NavigationStart) => {
      this.breadCrumbs = navigationStart.url.split('/').filter(s => s)
    })
  }
  ngOnInit(): void {
    this.store.select(getTicketsState)
      .subscribe((ticketState: TicketState) => {
        this.ticketState = ticketState;
        this.stateLoaded = true;
      });
  }
}
