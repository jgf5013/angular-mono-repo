import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketBrowserComponent } from './ticket-browser.component';
import { TicketDetailsComponent } from './ticket-details.component';
import { TicketService } from './ticket.service';
import { TicketRoutingModule } from './ticket-routing.module';
import { NewTicketComponent } from './new-ticket.component';
import { AppMaterialModule } from '../material/app-material.module';


@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    AppMaterialModule
  ],
  declarations: [TicketBrowserComponent, TicketDetailsComponent, NewTicketComponent],
  exports: [

  ]
})
export class TicketModule { }