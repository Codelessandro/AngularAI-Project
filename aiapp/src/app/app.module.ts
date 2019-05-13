import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TrackComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
