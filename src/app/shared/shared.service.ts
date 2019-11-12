import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  /**
   * Option dans la requete Http
   */
  public httpOptions = HttpClient;

  confirmationMessageSubject : BehaviorSubject<String> = new BehaviorSubject(null);
  currentConfirmationMessage = this.confirmationMessageSubject.asObservable();

  constructor() {}

  /**
   * @author Mamadou
   * @description Initialisation champ date en datePicker
   * @param cible qui definit l'input
   * @param type qui definit si [class ou id]
   */
  public initDatePicker(cible: string, type: string) {
    const caractere = type === 'class' ? '.' : '#';
    $(caractere + cible).datepicker({
      format: 'dd/mm/yyyy'
    });
  }

  /**
   * @author Mamadou
   * @description Initialisation champ select
   * @param cible qui definit l'input
   * @param type qui definit si [class ou id]
   */
  public initSelect(cible: string, type: string) {
    const caractere = type === 'class' ? '.' : '#';
    $(caractere + cible).formSelect();
  }

  /**
   * @author Mamadou
   * @description initialise la barre de navigation du header (responsive)
   * @param cible qui definit l'input
   * @param type qui definit si [class ou id]
   */
  initNavBar(cible: string, type: string) {
    const caractere = type === 'class' ? '.' : '#';
    $(caractere + cible).sidenav();
  }

  /**
   * @author Mamadou
   * @description config du header pour les requetes http
   * @returns header
   */
  public getHeadersConfig() {
    const httpOptions = {
      headers: ({'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json'}),
      withCredentials: true
    };
    return httpOptions;
  }

  /**
   * @author Mamadou
   * @description set les nouvelles valeurs emis par l'observable 
   * @param value nouvelle valeur
   */
  public setConfirmationSubject(value: String) {
    this.confirmationMessageSubject.next(value);
  }

}
