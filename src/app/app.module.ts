import { SearchOffresComponent } from './vues/search/offres/search-offres.component';
import { AlertComponent } from './vues/alert/alert.component';
import { TranslateModule } from '@ngx-translate/core';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './vues/home/home.component';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { HeaderComponent } from './vues/header/header.component';
import { ConfirmationModule } from './vues/confirmation/confirmation.module';
import { MaterialModule } from './material.module';
import { InterceptorService } from './service/config/interceptor.service';
import localeFr from '@angular/common/locales/fr';
import { MenuResponsiveComponent } from './vues/menu-responsive/menu-responsive.component';
import { PipeTransformers } from './pipes/pipe-transformers';
import { AuthentificationModule } from './vues/auth/authentification.module';
import { OffreModule } from './vues/offre/offre.module';
import { UserInscriptionModule } from './vues/user/user-inscription.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeFr, 'fr'); // initialisation format date en français (A changer pour les autres formats)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuResponsiveComponent,
    PipeTransformers,
    AlertComponent,
    SearchOffresComponent
  ],
  entryComponents: [AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ConfirmationModule,
    MaterialModule,
    AuthentificationModule,
    OffreModule,
    UserInscriptionModule,
    TranslateModule.forRoot(),
    SharedModule
  ],
  exports: [PipeTransformers, SearchOffresComponent],
  providers: [
     {provide: APP_BASE_HREF, useValue: ''},
     {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
     },
     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService,
     PipeTransformers
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
