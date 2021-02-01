import { PipeTransformers } from './../../../pipes/pipe-transformers';
import { Pays } from './../../../models/adresse';
import { catchError, shareReplay, map } from 'rxjs/operators';
import { API, httpOptions } from './../../../constantes/api-rest';
import { ImoResponse } from './../../../models/response/imo-response';
import { Observable, of } from 'rxjs';
import { OffreGlobal, Offre, Immobilier, OffreSearch } from './../../../models/offre/offre';
import { IOffre } from './../../api/offre/ioffre';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SharedService } from './../../../shared/shared.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffreService implements IOffre<OffreGlobal, Offre> {

  constructor(private http: HttpClient, private sharedService: SharedService,
              private dateFormat: PipeTransformers) { }

  createOffre(object: OffreGlobal): Observable<ImoResponse<OffreGlobal>> {
    const data = JSON.stringify(object);
    return this.http.post<ImoResponse<OffreGlobal>>(API.offreUri, data, httpOptions)
    .pipe(
      catchError (
        err => {
          return of(err.error);
        }
      ));
  }

  getListOffre(search: any): Observable<ImoResponse<OffreSearch>> {
    let parameters = new HttpParams();
    if (search !== null) {
      const categories = search.offre.categories as string[];
      parameters = parameters.append('typesServices', search.offre.typeServiceOffre);
      if (search.offre.ville !== null) {
        parameters = parameters.append('ville', search.offre.ville);
      }
      parameters = parameters.append('pays', search.offre.pays);
      if (search.offre.dateDebut !== null) {
        parameters = parameters.append('dateDebut', this.dateFormat.transform(search.offre.dateDebut, 'yyyy-MM-dd'));
      }
      if (search.offre.dateFin) {
        parameters = parameters.append('dateFin', this.dateFormat.transform(search.offre.dateFin, 'yyyy-MM-dd'));
      }
      parameters = parameters.append('categories', categories.toString().replace(',', '_'));
    }
    const httOptions = {
      headers: new HttpHeaders ({'Content-Type': 'application/json; charset=utf-8',
               Accept: 'application/json',
              'Access-Control-Allow-Origin': '*'}
      ),
      params: parameters,
      withCredentials: true
    };
    return this.http.get<ImoResponse<OffreSearch>>(API.getOffres, httOptions);
  }

  getListPays(): Observable<ImoResponse<Pays>> {
    return this.http.get<ImoResponse<Pays>>(API.getPays, httpOptions).pipe(shareReplay(1));
  }

  getOffreByCode(code: string): Observable<ImoResponse<OffreSearch>> {
    return this.http.get<ImoResponse<OffreSearch>>(API.isOffre+'/'+code+'/offre', httpOptions);
  }
}
