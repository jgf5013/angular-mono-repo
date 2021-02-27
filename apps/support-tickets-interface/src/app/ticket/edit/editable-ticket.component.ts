import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveType } from '../ticket-constants';
import { TicketService } from '../ticket.service';
import { INewSupportTicket, IExistingSupportTicket } from '../types';

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


  constructor(private router: Router, private route: ActivatedRoute, private ticketService: TicketService, private snackBar: MatSnackBar) {
    this.route.params.subscribe((param: any) => {
      if(param.ticketId) {
        this.saveType = SaveType.UPDATE;
        this.loadTicketById(param.ticketId);
      } else {
        this.saveType = SaveType.CREATE;
        this.loadNewTicket();
      }
    });
    this.statusMap = this.ticketService.getStatusMap();
    this.priorityMap = this.ticketService.getPriorityMap();

    console.log('statusMap: ', this.statusMap);
    console.log('priorityMap: ', this.priorityMap);
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
      error => {
        this.ticket = null;
      });
  }

  loadNewTicket(): void {
    this.ticket = {};
  }


  saveTicket(): void {
    this.ticketService.saveTicket(this.ticket, this.saveType);
  }

  deleteTicket(ticketId: number): void {
    this.ticketService.deleteTicket(ticketId).subscribe(
      data => {
        let message: string = `Ticket ${ticketId} deleted successfully. Redirecting to ticket browser...`;
        this.handleSuccessfulDeletion(message);
      },
      err => {
        console.error(err);
      }
    )
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

}
