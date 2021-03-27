import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as initialData from './initial-data.json';
import { IExistingSupportTicket, INewSupportTicket } from './types';
import { APP_CODE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TicketApiMockService {

    LOCAL_STORAGE_KEY: string = `${APP_CODE}-supportTickets`;

    constructor() {
        // local storage doesn't have the key... first time or just cleared the cache.
        if (localStorage.getItem(this.LOCAL_STORAGE_KEY) === null) {
            this.setLocalStorage([...initialData.supportTickets]);
        }
    }

    getAll(): Observable<IExistingSupportTicket[]> {
        const ticketData: IExistingSupportTicket[] = this.getLocalStorage();
        return of([...ticketData]);
    }

    get(id: number): Observable<IExistingSupportTicket> {
        let ticketData: IExistingSupportTicket[] = this.getLocalStorage();
        let ticket = ticketData.find(t => t.id === Number(id));
        return of(ticket);
    }

    post(ticket: INewSupportTicket): Observable<IExistingSupportTicket> {
        const newTicket: IExistingSupportTicket = {
            id: this.getNextTicketId(),
            lastUpdate: new Date().toJSON(),
            ...ticket
        };
        const ticketData: IExistingSupportTicket[] = this.getLocalStorage();
        this.setLocalStorage([...ticketData, newTicket]);
        return this.get(newTicket.id);
    }

    put(ticket: IExistingSupportTicket): Observable<IExistingSupportTicket> {
        const ticketData: IExistingSupportTicket[] = this.getLocalStorage();
        const updatedTicketData = {
            lastUpdate: new Date().toJSON(),
            ...ticketData.map(t => t.id === Number(ticket.id) ? ticket : t)
        }
        this.setLocalStorage(updatedTicketData);
        return this.get(ticket.id);
    }

    delete(id: number): Observable<void> {
        const ticketData: IExistingSupportTicket[] = this.getLocalStorage();
        const updatedTicketData = ticketData.filter(t => t.id !== Number(id));
        this.setLocalStorage(updatedTicketData);
        return of();
    }

    private getNextTicketId(): number {
        const ticketData: IExistingSupportTicket[] = this.getLocalStorage();
        return Math.max(...ticketData.map(t => t.id)) + 1;
    }

    private setLocalStorage(supportTickets: IExistingSupportTicket[]) {
        window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(supportTickets));
    }

    private getLocalStorage(): IExistingSupportTicket[] {
        let supportTickets: IExistingSupportTicket[] = JSON.parse(window.localStorage.getItem(this.LOCAL_STORAGE_KEY));
        return supportTickets;

    }
}
