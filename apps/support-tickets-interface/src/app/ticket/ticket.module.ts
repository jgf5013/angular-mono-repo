import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../material/app-material.module';
import { TicketBrowserComponent } from './browse/ticket-browser.component';
import { EditableTicketComponent } from './edit/editable-ticket.component';
import { TicketRoutingModule } from './ticket-routing.module';


@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [TicketBrowserComponent, EditableTicketComponent],
  exports: [

  ]
})
export class TicketModule { }