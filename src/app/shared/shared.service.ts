import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
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

  confirmationMessageSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  currentConfirmationMessage = this.confirmationMessageSubject.asObservable();

  isActifElementSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isActifElement = this.isActifElementSubject.asObservable();

  userName: string;
  email: string;

  constructor(private router: Router) {}

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
  public setConfirmationSubject(value: string) {
    this.confirmationMessageSubject.next(value);
    this.router.navigate(['/confirmation']);
  }

  /**
   * @author Mamadou
   * @param value
   */
  public setIsActifElement(value: boolean) {
    this.isActifElementSubject.next(value);
  }

  /**
   * @author Mamadou
   * @param infoAll the info token value
   * @returns userName
   */
  public getUserName(infoAll: string[]) {
    this.userName = infoAll !== null ? infoAll[1] : null;
  }

  /**
   * @author Mamadou
   * @param infoAll the info token value
   * @returns email
   */
  public getEmail(infoAll: string[]) {
    this.email = infoAll !== null ? infoAll[2] : null;
  }

  /**
   * @author Mamadou
   * @description retourne le nombre de jour entre 2 dates [Attention: si date == dateDuJour alors on retournera 1]
   * @param date
   * @returns nombre de jour
   */
  public convertDate(date: Date) {
    const dateDuJour = new Date().getTime() / 86400000;
    return Number(dateDuJour - date.getTime() / 86400000).toFixed(0);
  }

}
