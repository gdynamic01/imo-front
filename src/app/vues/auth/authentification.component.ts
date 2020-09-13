import { Role } from './../../models/users/role';
import { Router } from '@angular/router';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { SharedCustomValidate } from './../../shared/shared-custom-validate';
import { AuthService } from './../../service/config/auth.service';
import { TokenStorageService } from '../../service/config/token-storage.service';
import { Component, OnInit, Optional, OnDestroy } from '@angular/core';
import { User } from '../../models/users/user';
import { SharedService } from '../../shared/shared.service';
import { UtilisateurService } from '../../service/apiImpl/userimpl/utilisateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit, OnDestroy {

  user: User;
  messageErreur: boolean;
  colors: string;
  message: string;
  loading = false;
  authForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService, private userService: UtilisateurService,
              private tokenStorage: TokenStorageService, private authService: AuthService,
              private fb: FormBuilder, private sharedCustomValidate: SharedCustomValidate,
              private errorsService: ErrorsFormGeneriquesService, private router: Router
             ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['accueil']);
    }
    this.sharedService.itemSelectedSubject.next('connexion');
    this.errorsService.messageResponse.next(null);
    this.errorsService.isMessageErreur.next(false);
    this.subscriptions.push(this.errorsService.messageResponse.subscribe(
      value => {
        this.message = value;
      }
    ));
    this.subscriptions.push(this.errorsService.isMessageErreur.subscribe(
      value => {
        this.messageErreur = value;
      }
    ));
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
    let messageResponse;
    this.subscriptions.push(this.userService.authentification(values.email, values.password).pipe(
      map(
        connexion => {
          const result = connexion;
          if (connexion.statut === 200) {
            this.tokenStorage.saveToken(connexion.token);
            this.sharedService.setIsActifElement(true);
            this.sharedService.setInfosUsers(this.authService.getInfoUser());
          }
          messageResponse = result.messageResponse;
          return result;
        }
      ),
      mergeMap(
        result => this.userService.getRolesUser(values.email))
    ).subscribe(
      data => {
        localStorage.setItem('roles', JSON.stringify(data.result));
        this.router.navigate(['accueil']);
      }, error => {
        this.errorsService.traitementErreur(error.status, messageResponse);
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

}
