import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreationCompteUserMoralComponent } from './vues/user/user-moral/creation-compte-user-moral.component';
import { HomeComponent } from './vues/home/home.component';
import { UserMoralModule } from './vues/user/user-moral/modules/user-moral.module';
import { UserPhysiqueModule } from './vues/user/user-physique/modules/user-physique.module';
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './vues/header/header.component';
import { UserInscriptionComponent } from './vues/user/user-inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    CreationCompteUserMoralComponent,
    HomeComponent,
    HeaderComponent,
    UserInscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserMoralModule,
    UserPhysiqueModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''}],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
