import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MadlibsService } from './madlibs.service';
import { SpeechService } from './speech.service';
import { ListenComponent } from './listen/listen.component';
import { WordsFormComponent } from './words-form/words-form.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ListenComponent,
    WordsFormComponent,
    KeyboardComponent
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
