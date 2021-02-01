import { SharedModule } from './../../shared/shared.module';
import { OffreComponent } from './offre.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffreRoutingModule } from './offre-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OffreRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [OffreComponent]
})
export class OffreModule { }
