import { ImoResponse } from '../../../models/response/imo-response';
import { Observable } from 'rxjs';
import { TokenResponse } from '../../../models/response/token-response';

/**
 * interface gestion utilisateur
 */
export interface IUser <T, D> {

    /**
     * @author Mamadou
     * @description creation compte utilisateur professionnel
     * @param object user moral
     */
    creationProfessionnel(object: T): Observable<ImoResponse<T>>;

    /**
     * @author Mamadou
     * @description creation compte utilisateur physique
     * @param object user physique
     */
    creationParticulier(object: D): Observable<ImoResponse<D>>;

    /**
     * @author Mamadou
     * @description authentification user
     * @param object user
     */
    authentification(email: string, password: string): Observable<TokenResponse>;

    /**
     * @author Mamadou
     * @description récupération email
     * @param object string
     */
    getEmail(email: string): Observable<ImoResponse<string>>;
}
