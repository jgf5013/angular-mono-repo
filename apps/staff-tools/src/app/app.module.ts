import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppMaterialModule } from './material/app-material.module';
import { TicketEffects } from './ticket/ticket.effects';
import { reducers, metaReducers } from './reducer'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, AppMaterialModule, FlexLayoutModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([TicketEffects])
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
