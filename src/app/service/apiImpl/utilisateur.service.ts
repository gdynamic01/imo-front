import { SharedService } from './../../shared/shared.service';
import { UserPhysique } from './../../models/users/user-physique';
import { UserMoral } from './../../models/users/user-moral';
import { Injectable } from '@angular/core';
import { IUser } from '../api/user/iuser';
import { ImoResponse } from '../../models/response/imo-response';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constantes/api-rest';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService implements IUser<UserMoral, UserPhysique> {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  /**
   *
   * @author Mamadou
   * @description creation compte utilisateur moral
   * @param object user moral
   * @returns httpResponse reponse retourner par l'api
   *
   */
  creationProfessionnel(object: UserMoral): Observable<ImoResponse<UserMoral>> {
    const datas = JSON.stringify(object);
    return this.http.post<ImoResponse<UserMoral>>(API.profInscription, datas, this.sharedService.httpOptions);
  }

  /**
   *
   * @author Mamadou
   * @description creation compte utilisateur physique
   * @param object user physique
   * @returns httpResponse reponse retourner par l'api
   *
   */
  creationParticulier(object: UserPhysique): Observable<ImoResponse<UserPhysique>> {
    const datas = JSON.stringify(object);
    return this.http.post<ImoResponse<UserPhysique>>(API.parInscription, datas, this.sharedService.httpOptions);
  }
}
