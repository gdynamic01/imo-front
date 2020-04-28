import { Offres } from './../../../models/offres/offres';

import { ImoResponse } from '../../../models/response/imo-response';
import { Observable } from 'rxjs';
import { TokenResponse } from '../../../models/response/token-response';

/**
 * interface gestion utilisateur
 */
export interface IOffre{

    
   

    /**
     * @author Mamadou
     * @description creation compte utilisateur physique
     * @param object user physique
     */
    creationOffre(object: Offres): Observable<ImoResponse<Offres>>;

    
    
}
