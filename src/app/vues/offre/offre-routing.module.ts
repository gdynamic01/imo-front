import { DetailOffreComponent } from './details-offre/detail-offre.component';
import { OffreComponent } from './offre.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGard } from '../../service/config/auth.guard.service';


const routes: Routes = [
  {path: ':codeOffre/details-offre', component: DetailOffreComponent},
  {path: '', component: OffreComponent, canActivate: [AuthGard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
