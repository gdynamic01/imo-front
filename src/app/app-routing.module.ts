import { UserInscriptionComponent } from './vues/user/user-inscription.component';
import { HomeComponent } from './vues/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';
import { OffreComponent } from './vues/offre/offre.component';


const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent },
  { path: 'inscription', component: UserInscriptionComponent },
  {
    path: 'confirmation',
    loadChildren: () => import('../app/vues/confirmation/confirmation.module').then(mod => mod.ConfirmationModule)
  },
  { path: 'creation-offre', component: OffreComponent }
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
