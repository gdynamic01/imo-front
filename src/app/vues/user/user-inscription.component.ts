import { Router } from '@angular/router';
import { SharedCustomValidate } from './../../shared/shared-custom-validate';
import { UtilisateurService } from '../../service/apiImpl/userimpl/utilisateur.service';
import { RepresentantLegal } from './../../models/representant-legal';
import { User, TypeUtilisateurEnum, UserMoral } from './../../models/users/user';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog, MatRadioChange } from '@angular/material';
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
  user: User;
  professionnel: UserMoral;
  loading = false;
  message: string;
  messageErreur: boolean;
  colors: string;
  
  constructor(private userService: UtilisateurService,
              private sharedService: SharedService, private router: Router, 
              private fb: FormBuilder, private sharedCustomValidate: SharedCustomValidate
             ) {
     this.user = new User();
     this.professionnel = new UserMoral();
     this.user.adresse = new Adresse();
     this.user.representantLegal = new RepresentantLegal();
  }

  ngOnInit() {
    this.initForm();
    this.updateFieldsManadatoryForm('none');
  }

  initForm() {
    this.utilisateurForm = this.fb.group({
      user: this.fb.group({
        typeUtilisateur: ['PARTICULIER'],
        email: ['', Validators.required],
        passwords: this.fb.group({
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },{
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

  get password() {
    return this.utilisateurForm.get('user').get('passwords');
  }

  onSelect(event: MatRadioChange) {
    switch(event.value) {
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
      this.professionnel.init(this.user);
        this.userService.creationProfessionnel(this.professionnel).subscribe(
          data => {
            this.traitementErreur(data.statut, data.messageResponse);
          }
        );
    } else {
      this.userService.creationParticulier(this.user).subscribe(
        data => {
          this.traitementErreur(data.statut, data.messageResponse);
        }
      );
    }
  }

  initDataUtilisateur(object: any) {
    this.setUser(object);
    if (this.isProfessionnel) {
      this.user.roles.push('USER_MORAL');
      this.professionnel.init(this.user);
      this.professionnel.raisonSocial = object.userMoral.raisonSocial;
      this.professionnel.siret = object.userMoral.siret;
      this.professionnel.kbis = object.userMoral.kbis;
    } else {
      this.user.roles.push('USER_PHYSIQUE');
      this.professionnel = null;
    }
  }

  setUser(object: any) {
    this.user.representantLegal = object.user.representantLegal;
    this.user.adresse = object.user.adresse;
    this.user.email = object.user.email;
    this.user.password = object.user.passwords.password;
    this.user.confirmPassword = object.user.passwords.confirmPassword;
    this.user.typeUtilisateur = object.user.typeUtilisateur;
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
   * @param statut code erreur
   * @param messageResponse message reponse serveur
   * @description traitement erreur serveur
   */
  traitementErreur(statut: number, messageResponse: string) {
    this.loading = false;
    if ( statut === 400 || statut === 500) {
      this.message = messageResponse;
      this.alerteMessage();
    } else {
      this.sharedService.setConfirmationSubject(messageResponse);
    }
  }

}
