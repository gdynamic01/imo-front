import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const INFO_USER = 'infoUser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * @author Mamadou
   * @description deconnexion et suppression des infos users
   */
  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  /**
   * @author Mamadou
   * @description enregistrement du token et des info-user
   * @param token
   * @param infoUser
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  /**
   * @author Mamadou
   * @description retourne le token
   * @returns token
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

}
