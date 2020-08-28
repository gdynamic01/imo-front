import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './authentification.component';
import { NgModule } from '@angular/core';




const routes: Routes = [
    {path: '', component: AuthentificationComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthentificationRoutingModule {}
