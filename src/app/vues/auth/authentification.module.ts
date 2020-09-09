import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material.module';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthentificationModule { }
