import { Adresse } from './../adresse';
import { User } from './user';
import { RepresentantLegal } from '../representant-legal';
export class UserMoral extends User {
  
    /** kbis */
    public kbis: string;

    /** raison social */
    public raisonSocial: string ;

    /** siret */
    public siret: string;

    /**
     * @author Mamadou
     * @description initialise l'objet user moral
     * @param user identifiants user
     * @param siret identifiant entreprise
     * @param representantLegal info personnel utilisateu
     */
    public init(user: User) {
      this.email = user.email;
      this.password = user.password;
      this.representantLegal = user.representantLegal;
      this.typeUtilisateur = user.typeUtilisateur;
      this.roles = user.roles;
      this.adresse = user.adresse;
    }
}
