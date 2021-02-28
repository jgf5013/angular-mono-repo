import { createAction, props } from '@ngrx/store';
import { IExistingSupportTicket } from './types';

export const loadTickets = createAction('[Ticket Interface] Load Tickets');
export const ticketsLoaded = createAction('[Ticket Interface] Tickets Loaded', props<{ tickets: IExistingSupportTicket[] }>());
export const createTicket = createAction('[Ticket Interface] Create Ticket');
export const updateTicket = createAction('[Ticket Interface] Update Ticket');
export const deleteTicket = createAction('[Ticket Interface] Delete Ticket');