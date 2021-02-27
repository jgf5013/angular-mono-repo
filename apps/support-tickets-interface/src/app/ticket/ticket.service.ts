import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StatusType, PriorityType, SaveType } from './ticket-constants';
import { INewSupportTicket, IExistingSupportTicket } from './types';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  BASE_URL_TICKET_API: string = 'http://localhost:3000/support-tickets'

  constructor(private router: Router, private http: HttpClient) {
  }

  getTickets() {
    console.log(`getting all ticket...`);
    return this.http.get(this.BASE_URL_TICKET_API);
  }

  getTicket(ticketId: number): Observable<any> {
    console.log(`getting ticket... ticketId=${ticketId}`);
    return this.http.get(`${this.BASE_URL_TICKET_API}/${ticketId}`)
      .pipe(
        catchError(error => {
          return throwError({
            message: `An error occurred while fetching ticket details for ticket ${ticketId}`,
            ticketId
          });
        })
      );
  }

  deleteTicket(ticketId: number): Observable<any> {
    console.log(`deleting ticket... ticketId=${ticketId}`);
    return this.http.delete(`${this.BASE_URL_TICKET_API}/${ticketId}`);
  }

  // saveTicket(ticket: INewSupportTicket | IExistingSupportTicket, saveType: SaveType) {
  saveTicket(ticket: any, saveType: SaveType) {
    if(saveType === SaveType.CREATE) {
      return this.postTicket(ticket);
    } else if(saveType === SaveType.UPDATE) {
      return this.putTicket(ticket);
    } else {
      return throwError(`Unsupported save type... saveType=${saveType}`);
    }
  }

  private postTicket(ticket: INewSupportTicket) {
    console.log(`posting new ticket... ticket=${ticket}`);
    return this.http.post(`${this.BASE_URL_TICKET_API}`, ticket)
      .subscribe(
        (response) => {
          console.log('postTicket successful... response=', response);
        }, this.errorHandler);
  }

  private putTicket(ticket: IExistingSupportTicket) {
    console.log(`patching existing ticket... ticket=`, ticket);
    return this.http.put(`${this.BASE_URL_TICKET_API}/${ticket.id}`, ticket)
      .subscribe(
        (response) => {
          console.log('putTicket successful... response=', response);
        }, this.errorHandler);
  }

  errorHandler(error): Observable<any> {
    console.error(error);
    return of({});
  }

  getStatusMap() {
      return Object.keys(StatusType)
          .filter(s => isNaN(Number(s)) === false)
          .map(key => StatusType[key]);
  }
  getPriorityMap() {
    return Object.keys(PriorityType)
        .filter(p => isNaN(Number(p)) === false)
        .map(key => PriorityType[key]);
  }
}
