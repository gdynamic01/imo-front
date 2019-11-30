import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public jwtHelper: JwtHelperService, private tokenStorage: TokenStorageService) {}

    /**
     * @author Mamadou
     * @description verifie la validiter du token
     * @returns boolean
     */
    public isAuthenticated(): boolean {
      const token = this.tokenStorage.getToken(); // recuperer le token
      if(this.jwtHelper.isTokenExpired(token)) {
        this.tokenStorage.signOut();
        return true;
      }
      return false;
    }

    /**
     * @author Mamadou
     * @description recupère les infos de l'utilisateur
     * @returns les infos
     */
    public getInfoUser(): string[] {
      const token = this.tokenStorage.getToken();
      const username = this.jwtHelper.decodeToken(token);
      return (username !== null ? username['sub'].split(" ") : null);
    }
}