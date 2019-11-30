import { SharedService } from './../../shared/shared.service';
import { AuthService } from './auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthService, private router: Router) {}

    /**
     * @author Mamadou
     * @description gère les accès sur les differents routes (pages)
     * @param route
     * @param state 
     */
    canActivate(
                route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot
               ): boolean {
        
                if(!this.authService.isAuthenticated()){
                    this.router.navigate['accueil'];
                    return false;
                } 
                return true;
    }

}