import { Role } from './../../models/users/role';
import { OffreComponent } from './offre.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGard } from '../../service/config/auth.guard.service';


const routes: Routes = [
  {
    path: '', component: OffreComponent, canActivate: [AuthGard],
    data: {roles: [Role.part, Role.pro]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
