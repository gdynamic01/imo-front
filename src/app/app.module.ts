import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './vues/home/home.component';
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './vues/header/header.component';
import { UserInscriptionComponent } from './vues/user/user-inscription.component';
import { AlerteMessageComponent } from './vues/alerte-message/alerte-message.component';
import { ConfirmationModule } from './vues/confirmation/confirmation.module';
import { MaterialModule } from './material.module';
import { AuthentificationComponent } from './vues/auth/authentification.component';
import { InterceptorService } from './service/config/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserInscriptionComponent,
    AlerteMessageComponent,
    AuthentificationComponent
  ],
  entryComponents: [
    UserInscriptionComponent,
    AuthentificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ConfirmationModule,
    MaterialModule
  ],
  providers: [
     {provide: APP_BASE_HREF, useValue: ''},
     {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
     },
     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
