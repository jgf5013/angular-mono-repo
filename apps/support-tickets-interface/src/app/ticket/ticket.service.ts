import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StatusType, PriorityType, SaveType } from './constants';
import { INewSupportTicket, IExistingSupportTicket, TicketError } from './types';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private router: Router, private http: HttpClient) {
  }

  getTickets(): Observable<IExistingSupportTicket[]> {
    console.log(`getting all tickets...`);
    return this.http.get<IExistingSupportTicket[]>(environment.BASE_URL_TICKET_API)
      .pipe(
        catchError(error => {
          const ticketError: TicketError = {
            message: `An error occurred while fetching tickets`,
            error
          };
          console.error(ticketError);
          return of([]);
        })
      );
  }

  getTicket(ticketId: number): Observable<IExistingSupportTicket> {
    console.log(`getting ticket... ticketId=${ticketId}`);
    return this.http.get<IExistingSupportTicket>(`${environment.BASE_URL_TICKET_API}/${ticketId}`)
      .pipe(
        catchError(error => {
          const ticketError: TicketError = {
            message: `An error occurred while fetching ticket details for ticket ${ticketId}`,
            ticket: {id: ticketId},
            error
          };
          console.error(ticketError);
          return throwError(ticketError);
        })
      );
  }

  // saveTicket(ticket: INewSupportTicket | IExistingSupportTicket, saveType: SaveType) {
  saveTicket(ticket: any, saveType: SaveType): Observable<IExistingSupportTicket> {
    if(saveType === SaveType.CREATE) {
      return this.postTicket(ticket);
    } else if(saveType === SaveType.UPDATE) {
      return this.putTicket(ticket);
    } else {
      return throwError(`Unsupported save type... saveType=${saveType}`);
    }
  }

  private postTicket(ticket: INewSupportTicket): Observable<IExistingSupportTicket> {
    console.log(`posting new ticket... ticket=`, ticket);
    return this.http.post<IExistingSupportTicket>(`${environment.BASE_URL_TICKET_API}`, ticket)
      .pipe(
        catchError(error => {
          const ticketError: TicketError = {
            message: `An error occurred while creating ticket`,
            ticket,
            error
          };
          console.error(ticketError);
          return throwError(ticketError);
        })
      )
  }

  private putTicket(ticket: IExistingSupportTicket): Observable<IExistingSupportTicket> {
    console.log(`patching existing ticket... ticket=`, ticket);
    return this.http.put<IExistingSupportTicket>(`${environment.BASE_URL_TICKET_API}/${ticket.id}`, ticket)
      .pipe(
        catchError(error => {
          const ticketError: TicketError = {
            message: `An error occurred while creating ticket`,
            ticket,
            error
          };
          console.error(ticketError);
          return throwError(ticketError);
        })
      )
  }

  /* Note: delete returns an empty object ({}) on success and failure */
  deleteTicket(ticketId: number): Observable<any> {
    console.log(`deleting ticket... ticketId=${ticketId}`);
    return this.http.delete(`${environment.BASE_URL_TICKET_API}/${ticketId}`)
      .pipe(
        catchError(error => {
          const ticketError: TicketError = {
            message: `An error occurred while deleting ticket ${ticketId}`,
            ticket: {id: ticketId},
            error
          };
          console.error(ticketError);
          return throwError(ticketError);
        })
      )
  }

  getStatusMap() {
      return Object.values(StatusType)
          .filter(s => !isNaN(Number(s)))
          .map(key => StatusType[key]);
  }
  getPriorityMap() {
    return Object.keys(PriorityType)
        .filter(p => !isNaN(Number(p)))
        .map(key => PriorityType[key]);
  }
}
