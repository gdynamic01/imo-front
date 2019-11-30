import { HomeComponent } from './vues/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accueil', component: HomeComponent },
  {
    path: 'confirmation',
    loadChildren: () => import('../app/vues/confirmation/confirmation.module').then(mod => mod.ConfirmationModule)
  }
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
