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
import { UserInscriptionComponent } from './vues/user/user-inscription.component';
import { AlerteMessageComponent } from './vues/alerte-message/alerte-message.component';
import { ConfirmationModule } from './vues/confirmation/confirmation.module';
import { MaterialModule } from './material.module';
import { AuthentificationComponent } from './vues/auth/authentification.component';
import { InterceptorService } from './service/config/interceptor.service';
import localeFr from '@angular/common/locales/fr';
import { MenuResponsiveComponent } from './vues/menu-responsive/menu-responsive.component';
import { OffreComponent } from './vues/offre/offre.component';
import { EnumToArrayPipe } from './pipes/pipe-transformers-enum';
import { PipeTransformers } from './pipes/pipe-transformers';

registerLocaleData(localeFr, 'fr'); // initialisation format date en français (A changer pour les autres formats)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserInscriptionComponent,
    AlerteMessageComponent,
    AuthentificationComponent,
    MenuResponsiveComponent,
    OffreComponent,
    EnumToArrayPipe,
    PipeTransformers
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
    MaterialModule,
    TranslateModule.forRoot()
  ],
  exports: [EnumToArrayPipe, PipeTransformers],
  providers: [
     {provide: APP_BASE_HREF, useValue: ''},
     {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
     },
     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService,
     EnumToArrayPipe,
     PipeTransformers
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
