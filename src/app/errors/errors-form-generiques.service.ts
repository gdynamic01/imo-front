import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsFormGeneriquesService {

  status: Array<string> = ['400', '404', '500', '401'];
  messageResponse: BehaviorSubject<string> = new BehaviorSubject(null);
  isMessageErreur: BehaviorSubject<boolean> = new BehaviorSubject(false);
  colorsErreur: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }

  traitementErreur(statut: number, message: string) {
    if (this.status.includes(statut.toString())) {
      this.messageResponse.next(message);
      this.isMessageErreur.next(true);
      this.colorsErreur.next('red');
      return true;
    } else {
      return false;
    }
  }
}
