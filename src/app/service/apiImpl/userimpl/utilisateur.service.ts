import { httpOptions } from './../../../constantes/api-rest';
import { UserMoral } from './../../../models/users/user';
import { SharedService } from '../../../shared/shared.service';
import { User } from '../../../models/users/user';
import { Injectable } from '@angular/core';
import { IUser } from '../../api/user/iuser';
import { ImoResponse } from '../../../models/response/imo-response';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { API } from '../../../constantes/api-rest';
import { TokenResponse } from '../../../models/response/token-response';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService implements IUser<UserMoral, User> {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  /**
   *
   * @author Mamadou
   * @description creation compte professionnel
   * @param object user moral
   * @returns httpResponse reponse retourner par l'api
   *
   */
  creationProfessionnel(object: UserMoral): Observable<ImoResponse<UserMoral>> {
    const data = JSON.stringify(object);
    return this.http.post<ImoResponse<UserMoral>>(API.profInscription, data, httpOptions)
               .pipe(
                  catchError (
                    err => {
                      return of(err.error);
                    }
                  ));
  }

  /**
   * @author Mamadou
   * @description creation compte particulier
   * @param object user
   * @returns httpResponse reponse retourner par l'api
   */
  creationParticulier(object: User): Observable<ImoResponse<User>> {
    const data = JSON.stringify(object);
    return this.http.post<ImoResponse<User>>(API.parInscription, data, httpOptions)
               .pipe(
                 catchError (
                   err => {
                     return of(err.error);
                 }
                ));
  }

  /**
   * @author Mamadou
   * @description authentification user
   * @param object user
   * @returns httpResponse reponse retourner par l'api
   */
  authentification(email: string, password: string): Observable<TokenResponse> {
    const paramUri = email + '/' + password;
    return this.http.get<TokenResponse>(API.auth + paramUri, httpOptions)
               .pipe(
                  catchError (
                    err => {
                      return of(err.error);
                    }
                  ));
  }

  /**
   * recupération email
   * @param email the value email
   */
  getEmail(email: string): Observable<ImoResponse<string>> {
    return this.http.get<ImoResponse<string>>(API.checkEmail + email, httpOptions);
  }
}
