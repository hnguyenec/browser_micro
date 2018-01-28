import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MadlibsService } from './madlibs.service';
import { SpeechService } from './speech.service';
import { ListenComponent } from './listen/listen.component';

@NgModule({
  declarations: [
    AppComponent,
    ListenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    SpeechService,
    MadlibsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
