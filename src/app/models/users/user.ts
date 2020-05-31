import { Role } from './role';
import { Adresse } from '../adresse';
import { RepresentantLegal } from '../representant-legal';

export class User {
    email: string;
    password: string;
    typeUtilisateur: TypeUtilisateurEnum;
    adresse: Adresse = new Adresse();
    representantLegal: RepresentantLegal = new RepresentantLegal();
    roles = new Array<string>();
    confirmPassword: string;
}

export enum TypeUtilisateurEnum {
    ENTREPRISE,
    PARTICULIER
}

export class UserMoral extends User {
    kbis: string;
    raisonSocial: string ;
    siret: string;

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
