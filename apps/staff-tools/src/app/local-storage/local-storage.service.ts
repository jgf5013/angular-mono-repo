import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { StatusType, PriorityType, SaveType } from './constants';
// import { INewSupportTicket, IExistingSupportTicket, TicketError } from './types';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
      
  }

  getItem(key: string): Observable<any> {
    return of(localStorage.getItem(key));
  }

  setItem(key: string, value: any) {

  }

  removeItem(key: string): void {

  }
}
