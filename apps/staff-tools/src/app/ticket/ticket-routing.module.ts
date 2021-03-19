import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketBrowserComponent } from './browse/ticket-browser.component';
import { EditableTicketComponent } from './edit/editable-ticket.component';

const routes: Routes = [
  { path: '', component: TicketBrowserComponent },
  { path: 'new', component: EditableTicketComponent},
  { path: ':ticketId', component: EditableTicketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }