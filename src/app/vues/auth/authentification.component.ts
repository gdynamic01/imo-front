import { SharedCustomValidate } from './../../shared/shared-custom-validate';
import { UserInscriptionComponent } from './../user/user-inscription.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../../service/config/auth.service';
import { TokenStorageService } from '../../service/config/token-storage.service';
import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/users/user';
import { SharedService } from '../../shared/shared.service';
import { UtilisateurService } from '../../service/apiImpl/userimpl/utilisateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  user: User;
  messageErreur = false;
  colors: string; // parametre composant alerte-message
  message: string; // parametre du composant alerte-message
  loading = false;
  authForm: FormGroup;

  constructor(private sharedService: SharedService, private userService: UtilisateurService,
              private tokenStorage: TokenStorageService, private authService: AuthService,
              private fb: FormBuilder, private sharedCustomValidate: SharedCustomValidate,
              public dialogRef: MatDialogRef<AuthentificationComponent>
             ) {}

  ngOnInit() {
    this.user = new User();
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group({
      email: ['',
              {
                validators: [Validators.required, Validators.pattern(this.sharedCustomValidate.emailExReg)],
                asyncValidators: this.sharedCustomValidate.checkMailNotExist()
              }],
      password: ['',
                 {
                   validators: [Validators.required]
                 }]
    });
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  onSubmit() {
    const values = this.authForm.value;
    this.userService.authentification(values.email, values.password).subscribe(
      data => {
        if (data.statut === 401) {
          this.message = data.messageResponse;
          this.alerteMessage();
        } else {
          this.tokenStorage.saveToken(data.token);
          this.sharedService.setIsActifElement(true);
          this.sharedService.setInfosUsers(this.authService.getInfoUser());
          this.dialogRef.close();
        }
      }
    );
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
   * @description Ouverture de la popin
   * @param popin the type popin value
   */
  openDialog(popin: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
  }

}
