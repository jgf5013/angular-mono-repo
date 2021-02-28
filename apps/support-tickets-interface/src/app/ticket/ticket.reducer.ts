import { createReducer, on, createFeatureSelector } from '@ngrx/store';
import * as TicketActions from './ticket.actions';
import { IExistingSupportTicket } from './types';

export interface TicketState {
  tickets?: IExistingSupportTicket[]
}

export const initialState: TicketState = {
  tickets: null
};
 
const _ticketReducer = createReducer(
  initialState,
  on(TicketActions.ticketsLoaded, (state, { tickets }) => ({ ...state, tickets })),
  on(TicketActions.createTicket, (state) => state),
  on(TicketActions.updateTicket, (state) => state),
  on(TicketActions.deleteTicket, (state) => state)
);
 
export function reducer(state, action) {
  return _ticketReducer(state, action);
}

export const getTicketsState = createFeatureSelector<TicketState>('tickets');