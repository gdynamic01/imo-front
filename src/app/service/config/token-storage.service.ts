import { ObjectStorageService } from './object-storage.service';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * @description deconnexion et suppression des infos users
   */
  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
    localStorage.clear();
  }

  /**
   * @description enregistrement du token et des info-user
   * @param token
   * @param infoUser
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  /**
   * @description retourne le token
   * @returns token
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

}
