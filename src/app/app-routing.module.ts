import { AuthGuardService as AuthGard } from './service/config/auth.guard.service';
import { DetailsOffreComponent } from '../app/vues/offre/details-offre/details-offre.component';
import { HomeComponent } from './vues/home/home.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';


const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent },
  {
    path: 'inscription',
    loadChildren: () => import('../app/vues/user/user-inscription.module').then(mod => mod.UserInscriptionModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('../app/vues/confirmation/confirmation.module').then(mod => mod.ConfirmationModule)
  },
  {
    path: 'offre',
    loadChildren: () => import('../app/vues/offre/offre.module').then(mod => mod.OffreModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('../app/vues/auth/authentification.module').then(mod => mod.AuthentificationModule)
  },
  { path: ':codeOffre', component: DetailsOffreComponent, canActivate: [AuthGard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule, MatSidenavModule]
})
export class AppRoutingModule { }
