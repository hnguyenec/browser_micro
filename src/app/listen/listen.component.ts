import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { SpeechService } from '../speech.service';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {
  nouns: string[];
  verbs: string[];
  adjs: string[];
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  errorsSub: Subscription;
  errorMsg: string;

  constructor(public speech: SpeechService) { }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }

  ngOnInit() {
    this.speech.init();
    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
    this._listenErrors();
  }

  ngOnDestroy(): void {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
    this.errorsSub.unsubscribe();
  }

  private _listenNouns() {
    this.nounSub = this.speech.words$
    .pipe(
      filter(obj => obj.type === 'noun'),
      map(nounObj => nounObj.word)
    )
    .subscribe(
      noun => {
        this._setError();
        console.log(`noun: ${noun}`);
      }
    );
  }

  private _listenVerbs() {
    this.verbSub = this.speech.words$
    .pipe(
      filter(obj => obj.type === 'verb'),
      map(verbObj => verbObj.word)
    )
    .subscribe(
      verb => {
        this._setError();
        console.log(`verb: ${verb}`);
      }
    );
  }

  private _listenAdj() {
    this.adjSub = this.speech.words$
    .pipe(
      filter(obj => obj.type === 'adj'),
      map(adjObj => adjObj.word)
    )
    .subscribe(
      adj => {
        this._setError();
        console.log(`adjective: ${adj}`);
      }
    );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }


}

