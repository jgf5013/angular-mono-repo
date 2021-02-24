import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketBrowserComponent } from './ticket-browser.component';
import { TicketComponent } from './ticket.component';

const routes: Routes = [
  { path: '', component: TicketBrowserComponent },
  { path: ':ticketId', component: TicketComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }