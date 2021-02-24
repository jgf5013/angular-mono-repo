import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  BASE_URL_TICKET_API: string = 'http://localhost:3000/support-tickets'

  constructor(private http: HttpClient) { }

  getTickets() {
    return this.http.get(this.BASE_URL_TICKET_API);
  }

  getTicket(ticketId: number): Observable<any> {
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
    return this.http.delete(`${this.BASE_URL_TICKET_API}/${ticketId}`)
      .pipe(
        catchError(error => {
          return throwError({
            message: `An error occurred while deleting ${ticketId}`,
            ticketId
          });
        })
      );
  }

  postTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.BASE_URL_TICKET_API}`, ticket)
      .pipe(
        catchError(error => {
          return throwError({
            message: `An error occurred while creating the ticket`,
            ticket
          });
        })
      );
  }
}
