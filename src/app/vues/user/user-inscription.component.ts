import { Role } from './../../models/users/role';
import { UtilisateurService } from './../../service/apiImpl/utilisateur.service';
import { RepresentantLegal } from './../../models/representant-legal';
import { UserPhysique } from './../../models/users/user-physique';
import { UserMoral } from './../../models/users/user-moral';
import { User } from './../../models/users/user';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CHAMPS_FORM_INSCRIPTION } from '../../constantes/constantes-structures';

@Component({
  selector: 'app-user-inscription',
  templateUrl: './user-inscription.component.html',
  styleUrls: ['./user-inscription.component.scss']
})
export class UserInscriptionComponent implements OnInit {

  @Output() creationCompte = new EventEmitter<string>();
  isBlocProfessionnel = false;
  user: User;
  professionnel: UserMoral;
  particulier: UserPhysique;
  infoUser: RepresentantLegal;
  valideForm = false;
  messageErreur = false;
  colors: string; // parametre composant alerte-message
  message: string; // parametre composant alerte-message

  constructor(private errors: ErrorsFormGeneriquesService, private userService: UtilisateurService) {
     this.user = new User();
     this.professionnel = new UserMoral();
     this.particulier = new UserPhysique();
     this.infoUser = new RepresentantLegal();
  }

  ngOnInit() {
  }

  /**
   *
   * @author Mamadou
   * @description traite et envoie les données du formulaire au serveur
   * 
   */
  valider() {
    this.valideForm = this.errors.generateErrorsForm(CHAMPS_FORM_INSCRIPTION, 'form-inscription', 'class');
    if ( this.valideForm ) {
      this.setRole();
      if (this.isBlocProfessionnel) {
        // professionnel
        this.professionnel.init(this.user, this.infoUser);
        this.userService.creationProfessionnel(this.professionnel).subscribe(
          data => {
            // Traitement resultat
            this.traitementErreur(data.statut, data.messageResponse);
          }
        );
      } else {
        // particulier
        this.particulier.init(this.user, this.infoUser);
        this.userService.creationParticulier(this.particulier).subscribe(
          data => {
            // Traitement resultat
            this.traitementErreur(data.statut, data.messageResponse);
          }
        );
      }
    }
  }

  /**
   *
   * @author Mamadou
   * @description select bloc professionnel
   * @param type est le type utilisateur
   *
   */
  openform(type: string) {
    this.isBlocProfessionnel = (type === 'professionnel');
  }

  /**
   *
   * @author Mamadou
   * @description set le message d'erreur renvoyer par le serveur et la couleur d'erreur
   *
   */
  alerteMessage() {
    this.messageErreur = true;
    this.colors = 'red';
  }

  /**
   *
   * @author Mamadou
   * @description set le role et le type de l'utilisateur
   *
   */
  setRole() {
    if ( this.isBlocProfessionnel ) {
      this.user.roles.push('USER_MORAL');
      this.user.typeUtilisateur = 'ENTREPRISE';
    } else {
      this.user.roles.push('USER_PHYSIQUE');
      this.user.typeUtilisateur = 'PARTICULIER';
    }
  }

  /**
   *
   * @author Mamadou
   * @param statut numero erreur
   * @param messageResponse message reponse serveur
   *
   */
  traitementErreur(statut: number, messageResponse: string) {
    if ( statut === 400 || statut === 500) {
      this.message = messageResponse;
      this.alerteMessage();
    } else {
      this.creationCompte.emit(messageResponse);
    }
  }

}
