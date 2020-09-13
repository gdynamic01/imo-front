import { Observable } from 'rxjs';
import { ImoResponse } from '../../../models/response/imo-response';

export interface IOffre <T, D> {
    createOffre(object: T): Observable<ImoResponse<T>>;
    getListOffre(object: any): Observable<ImoResponse<D>>;
}
