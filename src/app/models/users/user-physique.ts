import { Adresse } from './../adresse';
import { User } from './user';
import { RepresentantLegal } from '../representant-legal';
export class UserPhysique extends User {
    /** adresse */
    public adresse: Adresse;

    /** representant legal */
    public representantLegal: RepresentantLegal;

    /** sexe */
    public sexe: string;

    /**
     *
     * @author Mamadou
     * @description initialise l'objet user moral
     * @param user identifiants user
     * @param siret identifiant entreprise
     * @param representantLegal info personnel utilisateu
     *
     */
    public init(user: User, representantLegal: RepresentantLegal) {
        this.email = user.email;
        this.password = user.password;
        this.representantLegal = representantLegal;
      }
}
