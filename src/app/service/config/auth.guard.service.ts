import { NONAUTHORIZED } from './../../constantes/constantes-datas';
import { AlertComponent } from './../../vues/alert/alert.component';
import { SharedService } from './../../shared/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Data } from '@angular/router';

import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router,
                private sharedService: SharedService,
                private matSnackBar: MatSnackBar) {}

    /**
     * @description gère les accès sur les differents routes (pages)
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isAuthenticated()) {
          const uri = state.url;
          switch (uri) {
            case '/offre':
              this.router.navigate(['connexion']);
              break;
            default:
              // Traitement du cas de details-offre
              if (uri !== 'accueil') {
                this.router.navigate(['connexion']);
              } else {
                this.router.navigate(['accueil']);
              }
              break;
          }
          return false;
        }
        this.redirectToUri(state.url, route.data);
        return true;
    }

    /**
     * @description dispatch les redirections
     * @param uri url de redirection
     * @param rolesUsers role utilisateur
     */
    private redirectToUri(uri: string, rolesUsers: Data) {
      const roles = JSON.parse(localStorage.getItem('roles'));
      switch (uri) {
        case ('/offre'):
          for (const role of roles) {
            if (!rolesUsers.roles.includes(role)) {
              // erreur 401 (unAuthorized)
              this.matSnackBar.openFromComponent(AlertComponent, {
                duration: 1500, data: {message: NONAUTHORIZED}
              });
              this.router.navigate(['/accueil']);
            }
          }
          break;
      }
    }
}
