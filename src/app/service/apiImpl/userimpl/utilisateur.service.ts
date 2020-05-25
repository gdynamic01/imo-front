import { SharedService } from '../../../shared/shared.service';
import { UserMoral } from '../../../models/users/user-moral';
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
    return this.http.post<ImoResponse<UserMoral>>(API.profInscription, data, this.sharedService.getHeadersConfig())
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
    const datas = JSON.stringify(object);
    return this.http.post<ImoResponse<User>>(API.parInscription, datas, this.sharedService.getHeadersConfig())
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
  authentification(object: User): Observable<TokenResponse> {
    const data = JSON.stringify(object);
    return this.http.post<TokenResponse>(API.auth, data, this.sharedService.getHeadersConfig())
               .pipe(
                  catchError (
                    err => {
                      return of(err.error);
                  }
                ));
  }
}
