import { Role } from './role';

export class User {
    /** email user */
    public email: string;

    /** mot de passe utilisateur */
    public password: string;

    public typeUtilisateur: string;

    /** liste des roles */
    public roles: Role[];
}
