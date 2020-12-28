import { Pays, Ville } from './../models/adresse';
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

  itemSelectedSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private router: Router) {}

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
      this.emailSubject.next(infoAll[infoAll.length - 1]);
    }
  }

  public setItemSelectedSubject(item: string) {
    this.itemSelectedSubject.next(item);
  }

  removeElement<T>(categories: T[], toRemove: T) {
    const index = categories.indexOf(toRemove);
    if (index !== -1) {
      categories.splice(index, 1);
    }
  }

  public redirection(uri: string) {
    switch (uri) {
      case 'creation-offre':
        this.router.navigate(['creation-offre']);
        break;
        case 'accueil':
          this.router.navigate(['accueil']);
          break;
          case 'inscription':
            this.router.navigate(['inscription']);
            break;
            case 'connexion':
              this.router.navigate(['connexion']);
              break;
              default:
                this.router.navigate(['accueil']);
    }
  }

  public getNomPays(listPays: Pays[]): string[] {
    const nomPays = new Array<string>();
    for (const pays of listPays) {
      nomPays.push(pays.nomPays);
    }
    return nomPays;
  }

  public getNomVillesByPays(nomPays: string, listPays: Pays[]): string[] {
    const nomVilles = new Array<string>();
    const pays = listPays.filter(value => value.nomPays === nomPays);
    for (let i = 0; i < pays[0].villes.length; i++) {
      nomVilles.push(listPays[0].villes[i].nomVille);
    }
    return nomVilles;
  }

  public getNomPaysByVille(nomVille: string, listPays: Pays[]): string[] {
    const nomPays = new Array<string>();
    for (const pays of listPays) {
      for (const ville of pays.villes) {
        if (ville.nomVille === nomVille) {
          nomPays.push(pays.nomPays);
          break;
        }
      }
    }
    return nomPays;
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
