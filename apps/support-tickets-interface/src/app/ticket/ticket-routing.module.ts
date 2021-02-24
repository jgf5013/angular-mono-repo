import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketBrowserComponent } from './ticket-browser.component';
import { TicketDetailsComponent } from './ticket-details.component';
import { NewTicketComponent } from './new-ticket.component';

const routes: Routes = [
  { path: '', component: TicketBrowserComponent },
  { path: 'new', component: NewTicketComponent},
  { path: ':ticketId', component: TicketDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }