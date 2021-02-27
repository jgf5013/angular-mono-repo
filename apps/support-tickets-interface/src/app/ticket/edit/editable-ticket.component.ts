import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveType, StatusType } from '../../constants';
import { TicketService } from '../ticket.service';
import { INewSupportTicket, IExistingSupportTicket, TicketError } from '../types';

@Component({
  selector: 'brightcomputing-editable-ticket',
  templateUrl: './editable-ticket.component.html',
  styleUrls: ['./editable-ticket.component.scss']
})
export class EditableTicketComponent {

  ticket: INewSupportTicket | IExistingSupportTicket = {};
  snackConfig: MatSnackBarConfig;
  statusMap: number[];
  priorityMap: number[];
  saveType: SaveType;
  showDelete: boolean;


  constructor(private router: Router, private route: ActivatedRoute, private ticketService: TicketService, private snackBar: MatSnackBar) {
    this.route.params.subscribe((param: any) => {
      if(param.ticketId) {
        this.saveType = SaveType.UPDATE;
        this.showDelete = true;
        this.loadTicketById(param.ticketId);
      } else {
        this.saveType = SaveType.CREATE;
        this.loadNewTicket();
      }
    });
    this.statusMap = this.ticketService.getStatusMap();
    this.priorityMap = this.ticketService.getPriorityMap();

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

  loadNewTicket(): void {
    this.ticket = {
      status: StatusType.OPEN
    };
  }


  saveTicket(): void {
    this.ticketService.saveTicket(this.ticket, this.saveType).subscribe(
      (responseTicket: IExistingSupportTicket) => {
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
