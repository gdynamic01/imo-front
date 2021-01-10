import { SharedModule } from './../../shared/shared.module';
import { EnumToArrayPipe } from './../../pipes/pipe-transformers-enum';
import { OffreComponent } from './offre.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffreRoutingModule } from './offre-routing.module';
import { DetailOffreComponent } from './details-offre/detail-offre.component';


@NgModule({
  declarations: [OffreComponent, DetailOffreComponent],
  imports: [
    CommonModule,
    OffreRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OffreModule { }
