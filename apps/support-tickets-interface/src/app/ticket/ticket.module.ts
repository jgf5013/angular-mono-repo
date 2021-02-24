import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketBrowserComponent } from './ticket-browser.component';
import { TicketComponent } from './ticket.component';
import { TicketService } from './ticket.service';
import { TicketRoutingModule } from './ticket-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule
  ],
  declarations: [TicketBrowserComponent, TicketComponent]
})
export class TicketModule { }