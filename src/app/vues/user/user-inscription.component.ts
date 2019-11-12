import { UtilisateurService } from '../../service/apiImpl/userimpl/utilisateur.service';
import { RepresentantLegal } from './../../models/representant-legal';
import { UserMoral } from './../../models/users/user-moral';
import { User } from './../../models/users/user';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { Component, OnInit, Output, EventEmitter, Optional } from '@angular/core';
import { CHAMPS_FORM_INSCRIPTION } from '../../constantes/constantes-structures';
import { MatDialogRef } from '@angular/material';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { Adresse } from './../../models/adresse';

@Component({
  selector: 'app-user-inscription',
  templateUrl: './user-inscription.component.html',
  styleUrls: ['./user-inscription.component.scss']
})
export class UserInscriptionComponent implements OnInit {

  // @Output() creationCompte = new EventEmitter<string>();
  isBlocProfessionnel = false;
  user: User;
  professionnel: UserMoral;
  // infoUser: RepresentantLegal;
  valideForm = false;
  messageErreur = false;
  colors: string; // parametre composant alerte-message
  message: string; // parametre composant alerte-message

  constructor(private errors: ErrorsFormGeneriquesService, private userService: UtilisateurService,
              @Optional() public dialogRef: MatDialogRef<UserInscriptionComponent>, 
              private sharedService: SharedService, private router: Router) {
     this.user = new User();
     this.professionnel = new UserMoral();
     this.user.adresse = new Adresse();
     this.user.representantLegal = new RepresentantLegal();
    //  this.infoUser = new RepresentantLegal();
  }

  ngOnInit() {
  }

  /**
   * @author Mamadou
   * @description traite et envoie les données du formulaire au serveur
   */
  valider() {
    this.valideForm = this.errors.generateErrorsForm(CHAMPS_FORM_INSCRIPTION, 'form-inscription', 'class');
    if ( this.valideForm ) {
      this.setRole();
      if (this.isBlocProfessionnel) {
        // professionnel
        this.professionnel.init(this.user);
        this.userService.creationProfessionnel(this.professionnel).subscribe(
          data => {
            this.traitementErreur(data.statut, data.messageResponse);
          }
        );
      } else {
        // particulier
        this.userService.creationParticulier(this.user).subscribe(
          data => {
            this.traitementErreur(data.statut, data.messageResponse);
          }
        );
      }
    }
  }

  /**
   * @author Mamadou
   * @description select bloc professionnel
   * @param type est le type utilisateur
   */
  addAndRemoveField(type: string) {
    this.isBlocProfessionnel = (type === 'professionnel');
  }

  /**
   * @author Mamadou
   * @description set le message d'erreur renvoyer par le serveur et la couleur d'erreur
   */
  alerteMessage() {
    this.messageErreur = true;
    this.colors = 'red';
  }

  /**
   * @author Mamadou
   * @description set le role et le type de l'utilisateur
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
   * @author Mamadou
   * @param statut numero erreur
   * @param messageResponse message reponse serveur
   * @description traitement erreur serveur
   */
  traitementErreur(statut: number, messageResponse: string) {
    if ( statut === 400 || statut === 500) {
      this.message = messageResponse;
      this.alerteMessage();
    } else {
      this.clos();
      this.confirmationCreationCompte(messageResponse);
    }
  }

  /**
   * @author Mamadou
   * @description Fermeture popin
   */
  clos() {
    this.dialogRef.close();
  }

  /**
   * @author Mamadou
   * @description affiche le composant confirmation creation compte
   * @param message message confirmation de la creation compte
   */
  confirmationCreationCompte(message: string) {
    this.sharedService.setConfirmationSubject(message);
    this.router.navigate(['/confirmation']);
  }

}
