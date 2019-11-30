import { UserInscriptionComponent } from './../user/user-inscription.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../../service/config/auth.service';
import { TokenStorageService } from '../../service/config/token-storage.service';
import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/users/user';
import { SharedService } from '../../shared/shared.service';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { CHAMPS_FORM_CONNEXION } from '../../constantes/constantes-structures';
import { UtilisateurService } from '../../service/apiImpl/userimpl/utilisateur.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  user: User;
  valideForm = false;
  messageErreur = false;
  colors: string; // parametre composant alerte-message
  message: string; // parametre composant alerte-message
  loading = false;

  constructor(@Optional() public dialogRef: MatDialogRef<AuthentificationComponent>,
              private router: Router, private errors: ErrorsFormGeneriquesService,
              private sharedService: SharedService, private userService: UtilisateurService,
              private tokenStorage: TokenStorageService, private authService: AuthService,
              private dialog: MatDialog
             ) {
                 this.user = new User();
              }

  ngOnInit() {
  }

  /**
   * @author Mamadou
   * @description validation du formulaire
   */
  valider() {
    this.valideForm = this.errors.generateErrorsForm(CHAMPS_FORM_CONNEXION, 'form-auth', 'class');
    if ( this.valideForm ) {
      this.loading = true;
      this.userService.authentification(this.user).subscribe(
        data => {
          this.loading = false;
          if (data.statut === 401) {
            this.message = data.messageResponse;
            this.alerteMessage();
          } else {
            this.tokenStorage.saveToken(data.token);
            this.sharedService.setIsActifElement(true);
            this.sharedService.getUserName(this.authService.getInfoUser());
            this.clos();
          }
        }
      )
    }
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
   * @description Fermeture popin
   */
  clos() {
    this.dialogRef.close();
  }

  /**
   * @author Mamadou
   * @description Ouverture de la popin
   * @param popin 
   */
  openDialog(popin: string): void {
    this.clos();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(UserInscriptionComponent, dialogConfig);
  }

}
