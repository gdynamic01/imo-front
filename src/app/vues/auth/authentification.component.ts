import { Router } from '@angular/router';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { SharedCustomValidate } from './../../shared/shared-custom-validate';
import { AuthService } from './../../service/config/auth.service';
import { TokenStorageService } from '../../service/config/token-storage.service';
import { Component, OnInit, Optional } from '@angular/core';
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
  messageErreur: boolean;
  colors: string;
  message: string;
  loading = false;
  authForm: FormGroup;

  constructor(private sharedService: SharedService, private userService: UtilisateurService,
              private tokenStorage: TokenStorageService, private authService: AuthService,
              private fb: FormBuilder, private sharedCustomValidate: SharedCustomValidate,
              private errorsService: ErrorsFormGeneriquesService, private router: Router
             ) {}

  ngOnInit() {
    this.sharedService.itemSelectedSubject.next('connexion');
    this.errorsService.messageResponse.next(null);
    this.errorsService.isMessageErreur.next(false);
    this.errorsService.messageResponse.subscribe(
      value => {
        this.message = value;
      }
    );
    this.errorsService.isMessageErreur.subscribe(
      value => {
        this.messageErreur = value;
      }
    );
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
        if (!this.errorsService.traitementErreur(data.statut, data.messageResponse)) {
          this.tokenStorage.saveToken(data.token);
          this.sharedService.setIsActifElement(true);
          this.sharedService.setInfosUsers(this.authService.getInfoUser());
          this.router.navigate(['accueil']);
        }
      }
    );
  }
}
