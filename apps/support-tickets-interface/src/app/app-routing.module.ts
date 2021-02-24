import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketBrowserComponent } from './ticket-browser/ticket-browser.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: 'tickets', component: TicketBrowserComponent },
  { path: 'tickets/:ticketId', component: TicketComponent },
  { path: '**', redirectTo: 'tickets' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }