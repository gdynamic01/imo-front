import { NONAUTHORIZED } from './../../constantes/constantes-datas';
import { AlertComponent } from './../../vues/alert/alert.component';
import { SharedService } from './../../shared/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Data } from '@angular/router';

import { SharedPopinGeneriques } from './../../shared/shared-popin-generiques';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router,
                private sharedPopinGeneriques: SharedPopinGeneriques, private sharedService: SharedService,
                private matSnackBar: MatSnackBar) {}

    /**
     * @author Mamadou
     * @description gère les accès sur les differents routes (pages)
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isAuthenticated()) {
          switch (state.url) {
            case '/offre/creation':
              this.router.navigate(['connexion']);
              break;
              default:
                this.router.navigate(['accueil']);
                break;
          }
          return false;
        }
        this.redirectToUri(state.url, route.data);
        return true;
    }

    private redirectToUri(uri: string, rolesUsers: Data) {
      const roles = JSON.parse(localStorage.getItem('roles'));
      switch (uri) {
        case ('/offre/creation'):
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
