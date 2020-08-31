import { MaterialModule } from './../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInscriptionComponent } from './user-inscription.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInscriptionRoutingModule } from './user-inscription-routing.module';


@NgModule({
  declarations: [UserInscriptionComponent],
  imports: [
    CommonModule,
    UserInscriptionRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserInscriptionModule { }
