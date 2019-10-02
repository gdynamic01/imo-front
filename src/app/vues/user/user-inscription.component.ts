import { UtilisateurService } from './../../service/apiImpl/utilisateur.service';
import { RepresentantLegal } from './../../models/representant-legal';
import { UserPhysique } from './../../models/users/user-physique';
import { UserMoral } from './../../models/users/user-moral';
import { User } from './../../models/users/user';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { Component, OnInit } from '@angular/core';
import { CHAMPS_FORM_INSCRIPTION } from '../../constantes/constantes-structures';

@Component({
  selector: 'app-user-inscription',
  templateUrl: './user-inscription.component.html',
  styleUrls: ['./user-inscription.component.scss']
})
export class UserInscriptionComponent implements OnInit {

  isBlocProfessionnel = false;
  user: User;
  professionnel: UserMoral;
  particulier: UserPhysique;
  infoUser: RepresentantLegal;
  valideForm = false;
  messageErreur = false;
  colors: string; // parametre composant alerte-message
  message: string // parametre composant alerte-message

  constructor(private errors: ErrorsFormGeneriquesService, private userService: UtilisateurService) {
     this.user = new User();
     this.professionnel = new UserMoral();
     this.particulier = new UserPhysique();
     this.infoUser = new RepresentantLegal();
  }

  ngOnInit() {
  }

  valider() {
    this.valideForm = this.errors.generateErrorsForm(CHAMPS_FORM_INSCRIPTION, 'form-inscription', 'class');
    if ( this.valideForm ) {
      if (this.isBlocProfessionnel) {
        // professionnel
        this.professionnel.init(this.user, this.infoUser);
        this.userService.creationProfessionnel(this.professionnel).subscribe(
          data => {
            // Traitement resultat
            console.log('____________ data: ', data);
            if ( data.statut === 400 ) {
              this.alerteMessage();
            }
          }
        );
      } else {
        // particulier
        this.particulier.init(this.user, this.infoUser);
        this.userService.creationParticulier(this.particulier).subscribe(
          data => {
            // Traitement resultat
            console.log('____________ data: ', data);
            if ( data.statut === 400 ) {
              this.alerteMessage();
            }
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

  alerteMessage() {
    this.messageErreur = true;
    this.message = 'Le formulaire contient des erreurs, veuillez contacter le service loumo@contact.fr';
    this.colors = 'red';
  }

}
