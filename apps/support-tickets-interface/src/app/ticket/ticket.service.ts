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

  deleteTicket(ticketId: number) {
    return this.http.delete(`${this.BASE_URL_TICKET_API}/${ticketId}`)
    .subscribe(
      (response) => {
        console.log('postTicket successful... response=', response);
      }, this.errorHandler);
  }

  postTicket(ticket: any) {
    return this.http.post(`${this.BASE_URL_TICKET_API}`, ticket)
      .subscribe(
        (response) => {
          console.log('postTicket successful... response=', response);
        }, this.errorHandler);
  }

  errorHandler(error): void {
    console.error(error);
  }
}
