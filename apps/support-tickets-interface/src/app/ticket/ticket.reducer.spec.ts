import * as fromReducer from './ticket.reducer';
import * as TicketActions from './ticket.actions';
import { IExistingSupportTicket } from './types';

describe('ticketReducer', () => {

    it('should return the default state', () => {
        const { initialState } = fromReducer;
        const action = {
            type: 'Unknown',
        };
        const state = fromReducer.reducer(initialState, action);

        expect(state).toBe(initialState);
    });

    it('should add tickets to the state', () => {
        const { initialState } = fromReducer;
        const mockTickets: IExistingSupportTicket[] = [
            { id: 0, priority: 0, title: 'Test', description: 'test', status: 0, email: 'myEmail@test.nl.edu', refersTo: []},
            { id: 12, priority: 2, title: 'Test', description: 'test', status: 1, email: 'myEmail@test.nl.edu', refersTo: [0]}
        ];
        const state = fromReducer.reducer(initialState, TicketActions.ticketsLoaded({
            tickets: mockTickets
        }));

        expect(state.tickets.length).toBe(2);
    });
  
});
