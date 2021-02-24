import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  BASE_URL_TICKET_API: string = 'http://localhost:3000/support-tickets'

  constructor(private router: Router, private http: HttpClient) { }

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

  postTicket(ticket: any) {
    console.log(`saving ticket... ticket=${ticket}`);
    return this.http.post(`${this.BASE_URL_TICKET_API}`, ticket)
      .subscribe(
        (response) => {
          console.log('postTicket successful... response=', response);
        }, this.errorHandler);
  }

  errorHandler(error): Observable<any> {
    console.error(error);
    return of({});
  }
}
