import { PAYS_AVEC_ADRESSE_COMPLETE } from './../../constantes/constantes-datas';
import { Router } from '@angular/router';
import { SharedCustomValidate } from './../../shared/shared-custom-validate';
import { UtilisateurService } from '../../service/apiImpl/userimpl/utilisateur.service';
import { RepresentantLegal } from './../../models/representant-legal';
import { User, UserMoral } from './../../models/users/user';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { Component, OnInit, Optional } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { SharedService } from '../../shared/shared.service';
import { Adresse } from './../../models/adresse';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-inscription',
  templateUrl: './user-inscription.component.html',
  styleUrls: ['./user-inscription.component.scss']
})
export class UserInscriptionComponent implements OnInit {
  utilisateurForm: FormGroup;
  isProfessionnel = false;
  utilisateur: User;
  professionnel: UserMoral;
  loading = false;
  message: string;
  messageErreur: boolean;
  colors: string;
  isAdresseObligatoire: boolean;

  constructor(private userService: UtilisateurService, private errorsService: ErrorsFormGeneriquesService,
              private sharedService: SharedService, private router: Router, private fb: FormBuilder,
              private sharedCustomValidate: SharedCustomValidate
             ) {
     this.messageErreur = false;
     this.message = null;
     this.colors = null;
     this.utilisateur = new User();
     this.professionnel = new UserMoral();
     this.utilisateur.adresse = new Adresse();
     this.utilisateur.representantLegal = new RepresentantLegal();
  }

  ngOnInit() {
    this.sharedService.itemSelectedSubject.next('inscription');
    this.errorsService.isMessageErreur.next(false);
    this.errorsService.colorsErreur.next(null);
    this.errorsService.messageResponse.next(null);
    this.initForm();
    this.updateFieldsManadatoryForm('none');
    this.errorsService.isMessageErreur.subscribe(
      value => {
        this.messageErreur = value;
      }
    );
    this.errorsService.colorsErreur.subscribe(
      value => {
        this.colors = value;
      }
    );
    this.errorsService.messageResponse.subscribe(
      value => {
        this.message = value;
      }
    );
  }

  initForm() {
    this.utilisateurForm = this.fb.group({
      user: this.fb.group({
        typeUtilisateur: ['PARTICULIER'],
        email: ['',
          {
            validators: [Validators.required, Validators.pattern(this.sharedCustomValidate.emailExReg)],
            asyncValidators: this.sharedCustomValidate.checkMailExist()
          }
        ],
        passwords: this.fb.group({
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },
        {
          asyncValidators: this.sharedCustomValidate.passwordValidate()
        }),
        adresse: this.fb.group({
          libelleRue: [''],
          numeroRue: [''],
          codePostal: [''],
          ville: ['', Validators.required],
          pays: ['', Validators.required]
        }),
        representantLegal: this.fb.group({
          sexe: ['', Validators.required],
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
        }),
        roles: this.fb.array([])
      }),
      userMoral: this.fb.group({
        siret: ['', Validators.required],
        raisonSocial: ['', Validators.required],
        kbis: ['']
      })
    });
  }

  get userMoral() {
    return this.utilisateurForm.get('userMoral');
  }

  get password() {
    return this.utilisateurForm.get('user').get('passwords');
  }

  get adresse() {
    return this.utilisateurForm.get('user').get('adresse');
  }

  get representantLegal() {
    return this.utilisateurForm.get('user').get('representantLegal');
  }

  get user() {
    return this.utilisateurForm.get('user');
  }

  get email() {
    return this.utilisateurForm.get('user').get('email');
  }

  onSelect(event: MatRadioChange) {
    switch (event.value) {
      case 'ENTREPRISE':
        this.isProfessionnel = true;
        this.updateFieldsManadatoryForm('');
        break;
      case 'PARTICULIER':
        this.isProfessionnel = false;
        this.updateFieldsManadatoryForm('none');
        break;
    }
  }

  onKey(event: any) {
    if (PAYS_AVEC_ADRESSE_COMPLETE.includes(event)) {
      this.adresse.get('libelleRue').setValidators(Validators.required);
      this.adresse.get('codePostal').setValidators(Validators.required);
      this.adresse.get('numeroRue').setValidators(Validators.required);
      this.isAdresseObligatoire = true;
    } else {
      this.adresse.get('libelleRue').clearValidators();
      this.adresse.get('codePostal').clearValidators();
      this.adresse.get('numeroRue').clearValidators();
      this.isAdresseObligatoire = false;
    }
    this.adresse.get('libelleRue').updateValueAndValidity();
    this.adresse.get('codePostal').updateValueAndValidity();
    this.adresse.get('numeroRue').updateValueAndValidity();
  }

  /**
   * @Description initialisation des champs obligatoires
   */
  updateFieldsManadatoryForm(defaults: string) {
    this.utilisateurForm.get('userMoral').patchValue({
      siret: defaults,
      raisonSocial: defaults
    });
  }

  onSubmit() {
    this.initDataUtilisateur(this.utilisateurForm.value);
    if (this.isProfessionnel) {
      this.professionnel.init(this.utilisateur);
      this.userService.creationProfessionnel(this.professionnel).subscribe(
          data => {
            if (!this.errorsService.traitementErreur(data.statut, data.messageResponse)) {
              this.sharedService.setConfirmationSubject(data.messageResponse);
            }
          }
        );
    } else {
      this.userService.creationParticulier(this.utilisateur).subscribe(
        data => {
          if (!this.errorsService.traitementErreur(data.statut, data.messageResponse)) {
            this.sharedService.setConfirmationSubject(data.messageResponse);
          }
        }
      );
    }
  }

  initDataUtilisateur(object: any) {
    this.setUser(object);
    if (this.isProfessionnel) {
      this.utilisateur.roles.push('ROLE_USER_MORAL');
      this.professionnel.init(this.utilisateur);
      this.professionnel.raisonSocial = object.userMoral.raisonSocial;
      this.professionnel.siret = object.userMoral.siret;
      this.professionnel.kbis = object.userMoral.kbis;
    } else {
      this.utilisateur.roles.push('ROLE_USER_PHYSIQUE');
      this.professionnel = null;
    }
  }

  setUser(object: any) {
    this.utilisateur.representantLegal = object.user.representantLegal;
    this.utilisateur.adresse = object.user.adresse;
    this.utilisateur.email = object.user.email;
    this.utilisateur.password = object.user.passwords.password;
    this.utilisateur.confirmPassword = object.user.passwords.confirmPassword;
    this.utilisateur.typeUtilisateur = object.user.typeUtilisateur;
  }
}
