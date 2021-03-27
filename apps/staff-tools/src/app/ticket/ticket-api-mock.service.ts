import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as initialData from './initial-data.json';
import { IExistingSupportTicket, INewSupportTicket } from './types';


@Injectable({
  providedIn: 'root'
})
export class TicketApiMockService {

    ticketData: IExistingSupportTicket[] = [...initialData.supportTickets];

    constructor() {
        console.log('frozen1: ', Object.isFrozen(this.ticketData));
    }

    getAll(): Observable<IExistingSupportTicket[]> {
        return of(this.ticketData.length ? [...this.ticketData] : []);
    }

    get(id: number): Observable<IExistingSupportTicket> {
        const ticket = this.ticketData.find(t => t.id === Number(id));
        return of(ticket);
    }

    post(ticket: INewSupportTicket): Observable<IExistingSupportTicket> {
        const newTicket: IExistingSupportTicket = {
            id: this.getNextTicketId(),
            ...ticket
        };
        // this.ticketData.push(newTicket);
        this.ticketData = [...this.ticketData, newTicket];
        return this.get(newTicket.id);
    }

    put(ticket: IExistingSupportTicket): Observable<IExistingSupportTicket> {
        this.ticketData = this.ticketData.map(t => t.id === Number(ticket.id) ? ticket : t);
        return this.get(ticket.id);
    }

    delete(id: number): Observable<void> {
        this.ticketData = this.ticketData.filter(t => t.id !== Number(id));
        return of();
    }

    private getNextTicketId(): number {
        return Math.max(...this.ticketData.map(t => t.id)) + 1;
    }
}
