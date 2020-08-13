import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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

  userNameSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  emailSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private router: Router) {}

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
  public setInfosUsers(infoAll: string[]) {
    if (infoAll !== null) {
      this.userNameSubject.next(infoAll[1]);
      this.emailSubject.next(infoAll[2]);
    }
  }
}
