import { SharedPopinGeneriques } from './../../shared/shared-popin-generiques';
import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthService, private router: Router,
                private sharedPopinGeneriques: SharedPopinGeneriques) {}

    /**
     * @author Mamadou
     * @description gère les accès sur les differents routes (pages)
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
                if (!this.authService.isAuthenticated()) {
                    switch (state.url) {
                        case '/creation-offre':
                            this.router.navigate(['connexion']);
                            break;
                            default:
                                this.router.navigate(['accueil']);
                                break;
                    }
                    return false;
                }
                return true;
    }
}
