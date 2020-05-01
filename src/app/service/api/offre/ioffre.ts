import { Offres, OffreGlobalDto } from '../../../models/offres/offre';

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
    creationOffre(object: OffreGlobalDto): Observable<ImoResponse<OffreGlobalDto>>;

    
    
}
