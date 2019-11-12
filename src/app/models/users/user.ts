import { Role } from './role';
import { Adresse } from '../adresse';
import { RepresentantLegal } from '../representant-legal';

export class User {
    /** email user */
    public email: string;

    /** mot de passe utilisateur */
    public password: string;

    public typeUtilisateur: string;

    /** adresse */
    public adresse: Adresse;

    /** representant legal */
    public representantLegal: RepresentantLegal;

    /** liste des roles */
    public roles = new Array<string>();

}
