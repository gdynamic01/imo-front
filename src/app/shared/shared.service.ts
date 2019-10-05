import { Injectable, ElementRef } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

declare var $: any;
declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  /**
   * Option dans la requete Http
   */
  public httpOptions = HttpClient;

  constructor() {
  }

  /**
   *
   * @author Mamadou
   * @description Initialisation champ date en datePicker
   * @param cible qui definit l'input
   * @param type qui definit si [class ou id]
   *
   */
  public initDatePicker(cible: string, type: string) {
    const caractere = type === 'class' ? '.' : '#';
    $(caractere + cible).datepicker({
      format: 'dd/mm/yyyy'
    });
  }

  /**
   *
   * @author Mamadou
   * @description Initialisation champ select
   * @param cible qui definit l'input
   * @param type qui definit si [class ou id]
   *
   */
  public initSelect(cible: string, type: string) {
    const caractere = type === 'class' ? '.' : '#';
    $(caractere + cible).formSelect();
  }

  /**
   *
   * @author Mamadou
   * @description initialise la barre de navigation du header (responsive)
   * @param cible qui definit l'input
   * @param type qui definit si [class ou id]
   *
   */
  initNavBar(cible: string, type: string) {
    const caractere = type === 'class' ? '.' : '#';
    $(caractere + cible).sidenav();
  }

  /**
   *
   * @author Mamadou
   * @description Initialisation des modals
   * @param modal reference du modal dans le template
   *
   */
  public initModal(modal: ElementRef) {
    M.Modal.init(modal.nativeElement);
  }

  /**
   *
   * @author Mamadou
   * @description Recupere l'instance du modal
   * @param modal reference du modal dans le template
   * @returns Instance modal
   *
   */
  public getInstances(modal: ElementRef) {
    return M.Modal.getInstance(modal.nativeElement);
  }

  /**
   *
   * @author Mamadou
   * @description config du header pour les requetes http
   * @returns header
   *
   */
  public getHeadersConfig() {
    const httpOptions = {
      headers: ({'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json'}),
      withCredentials: true
    };
    return httpOptions;
  }

}
