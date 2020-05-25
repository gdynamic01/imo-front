import { catchError } from 'rxjs/operators';
import { API, httpOptions } from './../../../constantes/api-rest';
import { ImoResponse } from './../../../models/response/imo-response';
import { Observable, of } from 'rxjs';
import { OffreGlobal, Offre } from './../../../models/offre/offre';
import { IOffre } from './../../api/offre/ioffre';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './../../../shared/shared.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffreService implements IOffre<OffreGlobal, Offre> {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  createOffre(object: OffreGlobal): Observable<ImoResponse<OffreGlobal>> {
    const data = JSON.stringify(object);
    return this.http.post<ImoResponse<OffreGlobal>>(API.offreCrate, data, httpOptions)
    .pipe(
      catchError (
        err => {
          return of(err.error);
        }
      ));
  }

  getListOffre(): Observable<ImoResponse<Offre>> {
    return of(null);
  }
}
