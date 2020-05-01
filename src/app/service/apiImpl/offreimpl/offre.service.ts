import { OffreGlobal,Offre} from '../../../models/offres/offre';
import { Injectable } from '@angular/core';
import { IOffre } from '../../api/offre/ioffre';
import { ImoResponse } from '../../../models/response/imo-response';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { API } from '../../../constantes/api-rest';
import { SharedService } from '../../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class OffreService  implements IOffre{
  constructor(private http: HttpClient, private sharedService: SharedService) { }    /**
     * @author Mamadou
     * @description creation compte utilisateur physique
     * @param object user physique
     */
    creationOffre(OffreGlobal: OffreGlobal): Observable<ImoResponse<OffreGlobal>>{
      const datas = JSON.stringify(OffreGlobal);

      return this.http.post<ImoResponse<OffreGlobal>>(API.offreInscription, datas, this.sharedService.getHeadersConfig())
      .pipe(
         catchError (
           err => {
             return of(err.error);
           }
         ));



    }


}

