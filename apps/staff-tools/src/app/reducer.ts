import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromTickets from './ticket/ticket.reducer';




export interface State {
  tickets: fromTickets.TicketState
}


export function logAction(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    // console.group('Action:');
    // console.info('state', state);
    // console.info('action', action);
    // console.groupEnd();
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  tickets: fromTickets.reducer
};


export const metaReducers: MetaReducer<State>[] = [logAction];
