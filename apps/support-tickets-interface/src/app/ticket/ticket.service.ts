import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get(`${this.BASE_URL_TICKET_API}/${ticketId}`);
  }
}
