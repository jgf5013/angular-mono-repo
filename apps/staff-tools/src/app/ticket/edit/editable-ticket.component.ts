import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducer';
import { initialTicket, SaveType, StatusType } from '../constants';
import * as TicketActions from '../ticket.actions';
import { TicketService } from '../ticket.service';
import { IExistingSupportTicket, INewSupportTicket, TicketError } from '../types';
import { getTicketsState, TicketState } from '../ticket.reducer';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { priorityColorMap } from '../constants';



@Component({
  selector: 'demo-org-editable-ticket',
  templateUrl: './editable-ticket.component.html',
  styleUrls: ['./editable-ticket.component.scss']
})
export class EditableTicketComponent {

  ticket: INewSupportTicket | IExistingSupportTicket;
  snackConfig: MatSnackBarConfig;
  statusMap: any[];
  priorityMap: number[];
  saveType: SaveType;
  showDelete: boolean;
  priorityColorMap: any = priorityColorMap;

  ticketId: number;
  ticketState: TicketState;

  constructor(
    private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute,
    private ticketService: TicketService, private snackBar: MatSnackBar) {

    this.loadTicket();
    this.statusMap = this.ticketService.getStatusMap();
    this.priorityMap = this.ticketService.getPriorityMap();

    this.store.select(getTicketsState)
      .subscribe((ticketState: TicketState) => {
        this.ticketState = ticketState;
      });

  }

  loadTicket(): void {

    this.route.params.subscribe((param: any) => {
      if(param.ticketId) {
        this.ticketId = Number(param.ticketId);
        this.saveType = SaveType.UPDATE;
        this.showDelete = true;
        this.loadTicketById(param.ticketId);
      } else {
        this.saveType = SaveType.CREATE;
        this.loadNewTicket();
      }
    });
  }
  loadNewTicket(): void {
    this.ticket = {
      ...initialTicket
    };
  }


  goToTicketBrowser(): void {
    this.router.navigate(['tickets']);
  }


  loadTicketById(ticketId: number): void {
    this.ticketService.getTicket(ticketId)
    .subscribe(
      ticket => {
        this.ticket = ticket;
      },
      (error: TicketError) => {
        this.ticket = null;
        this.handleFailure(error);
      });
  }


  saveTicket(): void {
    this.ticketService.saveTicket(this.ticket, this.saveType).subscribe(
      (responseTicket: IExistingSupportTicket) => {
        // ticketCreated effect will reload the ticket queue
        this.store.dispatch(SaveType.CREATE === this.saveType ? TicketActions.createTicket() : TicketActions.updateTicket());
        let message: string = `${SaveType[this.saveType]}: Ticket saved successfully. Ticket # ${responseTicket.id}`;
        this.handleSuccess(message);
      },
      (err: TicketError) => {
        this.handleFailure(err)
      }
    )
  }

  deleteTicket(ticketId: number): void {
    this.ticketService.deleteTicket(ticketId).subscribe(
      (data: any) => {
        // ticketCreated effect will reload the ticket queue
        this.store.dispatch(TicketActions.deleteTicket());
        let message: string = `DELETE: Ticket ${ticketId} deleted successfully. Redirecting to ticket browser...`;
        this.handleSuccessfulDeletion(message);
      },
      (err: TicketError) => {
        this.handleFailure(err)
      }
    )
  }


  handleSuccess(message: string): void {
    this.snackConfig = {
      panelClass: ['success']
    }
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  handleSuccessfulDeletion(message: string): void {

    this.snackConfig = {
      panelClass: ['deleted']
    }
    let ref = this.snackBar.open(message, '', {
      duration: 3000,
    });

    ref.afterDismissed().subscribe(() => {
      this.goToTicketBrowser();
    });
  }

  handleFailure(ticketError: TicketError): void {

    this.snackConfig = {
      panelClass: ['failure']
    }
    this.snackBar.open(ticketError.message, '', {
      duration: 5000,
    });

  }

}
