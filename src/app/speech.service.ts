import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// typescript declaration for annyang
declare var annyang: any;

@Injectable()
export class SpeechService {

  words$ = new Subject<{[key: string]: string}>();
  errors$ = new Subject<{[key: string]: any}>();
  listening = false;

  constructor(private zone: NgZone) { }

  init() {
    const commands = {
      'noun: noun': (noun) => {
        this.zone.run(() => {
          this.words$.next({
            type: 'noun',
            'word': noun
          });
        });
      },
      'verb: verb': (verb) => {
        this.zone.run(() => {
          this.words$.next({
            type: 'verb',
            'word': verb
          });
        });
      },
      'adjective: adj': (adj) => {
        this.zone.run(() => {
          this.words$.next({
            type: 'adj',
            'word': adj
          });
        });
      }
    };

    annyang.addCommands(commands);
    this._addCallbacks();
  }

  private _addCallbacks() {
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });

    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });

    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });

    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "noun [word]", "verb [word]", OR "adjective [word]".',
        { results: userSaid });
    });
  }

  private _handleError(error: string, msg: string, errObj: any) {
    this.zone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }

  startListening() {
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }

  get speechSupported(): boolean {
    return !!annyang;
  }

}
