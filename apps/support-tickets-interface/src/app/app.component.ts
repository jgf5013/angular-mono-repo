import { Component, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as fromRoot from './reducer';
import * as TicketActions from './ticket/ticket.actions';
import { getTicketsState, TicketState } from './ticket/ticket.reducer';



@Component({
  selector: 'brightcomputing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ticketState: TicketState;
  stateLoaded = true;
  breadCrumbs: string[];

  @ViewChild('sidenav') sidenav: MatSidenav;
  
  constructor(private store: Store<fromRoot.State>, private router: Router, public mediaObserver: MediaObserver) {
    
    this.listenToRouterUpdates();
    this.listenToMediaUpdates();
    this.listenToTicketStateUpdates();

    this.store.dispatch(TicketActions.loadTickets());
  }

  listenToTicketStateUpdates(): void {
    this.store.select(getTicketsState)
      .subscribe((ticketState: TicketState) => {
        this.ticketState = ticketState;
        this.stateLoaded = true;
      });
  }

  listenToMediaUpdates(): void {
    this.mediaObserver.asObservable()
    .subscribe((change: MediaChange[]) => {
      if (!this.mediaObserver.isActive('gt-xs')) {
        this.sidenav.close();
      }
    });
  }

  listenToRouterUpdates(): void {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart)
    )
    .subscribe((navigationStart: NavigationStart) => {
      this.breadCrumbs = navigationStart.url.split('/').filter(s => s)
    })
  }
}
