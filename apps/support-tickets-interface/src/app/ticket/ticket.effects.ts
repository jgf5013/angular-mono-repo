import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as TicketActions from './ticket.actions';
import { TicketService } from './ticket.service';
import { IExistingSupportTicket } from './types';

@Injectable()
export class TicketEffects {

  loadTickets$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.loadTickets),
    mergeMap(() => this.ticketService.getTickets()
      .pipe(
        map((tickets: IExistingSupportTicket[]) => TicketActions.ticketsLoaded({tickets: tickets}))
      ))
    )
  );

  ticketCreated$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.createTicket, TicketActions.updateTicket, TicketActions.deleteTicket),
    mergeMap(() => this.ticketService.getTickets()
      .pipe(
        map((tickets: IExistingSupportTicket[]) => TicketActions.ticketsLoaded({tickets: tickets}))
      ))
    )
  );

  constructor(private actions$: Actions, private ticketService: TicketService) {}
}