import { UserPhysique } from './../../models/users/user-physique';
import { UserMoral } from './../../models/users/user-moral';
import { Injectable } from '@angular/core';
import { IUser } from '../api/user/iuser';
import { ImoResponse } from '../../models/response/imo-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfessionnelService implements IUser<UserMoral, UserPhysique> {

  constructor() { }

  /**
   *
   * @author Mamadou
   * @description creation compte utilisateur moral
   * @param object user moral
   * @returns httpResponse
   *
   */
  creationProfessionnel(object: UserMoral): Observable<ImoResponse<UserMoral>> {

    return null;
  }

  /**
   *
   * @author Mamadou
   * @description creation compte utilisateur physique
   * @param object user physique
   * @returns httpResponse
   *
   */
  creationParticulier(object: UserPhysique): Observable<ImoResponse<UserPhysique>> {

    return null;
  }
}
