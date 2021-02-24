import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketService } from './ticket.service';

@Component({
  selector: 'brightcomputing-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent {

  ticket: any = {};
  param: any;
  snackConfig: MatSnackBarConfig;

  constructor(private router: Router, private route: ActivatedRoute, private ticketService: TicketService, private snackBar: MatSnackBar) {
    this.route.params.subscribe((param: any) => {
      this.param = param;
      this.loadTicket();
    });
  }

  loadTicket() {
    this.ticketService.getTicket(this.param.ticketId)
    .subscribe(
      ticket => {
        this.ticket = ticket;
      },
      error => {
        this.ticket = {};
      });
  }

  goToTicketBrowser() {
    this.router.navigate(['tickets']);
  }

  save() {

  }

  deleteTicket(ticketId: number) {
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

  handleSuccessfulDeletion(message: string) {

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
