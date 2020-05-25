import { SharedService } from './../../shared/shared.service';
import { OffreService } from './../../service/apiImpl/offreimpl/offre.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OffreGlobal, Offre, Immobilier, Mobile, TypeOffreEnum, TypeServiceEnum, TypeMobileMoteurEnum } from '../../models/offre/offre';
import { EnumToArrayPipe } from '../../pipes/pipe-transformers-enum';
import { TYPE_OFFRE_IMMOBILIER, TYPE_OFFRE_MOBILE } from '../../constantes/constantes-datas';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {

  offreForm: FormGroup;
  offreGlobal: OffreGlobal = new OffreGlobal();
  offre: Offre = new Offre();
  immobilier: Immobilier = new Immobilier();
  mobile: Mobile = new Mobile();
  typeOffreEnum = TypeOffreEnum;
  typeServiceEnum = TypeServiceEnum;
  typeMobileMoteurEnum = TypeMobileMoteurEnum;
  isImmobilier: boolean;
  isMobilie: boolean;
  isVelo: boolean;
  valueDefaultImmo: string;
  valueDefaultMobile: string;
  valueDefaultDate = new Date();

  constructor(private fb: FormBuilder, private enumToArrays: EnumToArrayPipe,
              private offreService: OffreService, private sharedService: SharedService) {
   }

  ngOnInit() {
    this.isImmobilier = false;
    this.isMobilie = false;
    this.isVelo = false;
    this.initForm();
  }

  /**
   * initialization form group
   */
  initForm() {
    this.offreForm = this.fb.group({
      offre: this.fb.group({
        titre: ['', Validators.required],
        typeOffre: ['', Validators.required],
        typeServiceOffre: ['', Validators.required],
        description: [''],
        prix: ['', Validators.required],
        adresse: this.fb.group({
          libelleRue: [''],
          numeroRue: [''],
          codePostal: [''],
          ville: ['', Validators.required],
          pays: ['', Validators.required]
        })
      }),
      immobilier: this.fb.group ({
        surface: ['', Validators.required]
      }),
      mobile: this.fb.group({
        dateMiseEnCircualtion: ['', Validators.required],
        typeMobileMoteur: ['', Validators.required],
        model: ['', Validators.required]
      })
    });
  }

  /**
   * @description display the block corresponding to the type of offer
   * @param event the typeOffre value
   */
  selectChange(value: any) {
    switch (value) {
      case (TYPE_OFFRE_IMMOBILIER.find(e => value === e)):
        this.isImmobilier = true;
        this.isMobilie = false;
        this.valueDefaultMobile = 'none';
        this.valueDefaultImmo = '';
        this.updateFieldsManadatoryForm();
        break;
      case (TYPE_OFFRE_MOBILE.find(e => value === e)):
        this.isImmobilier = false;
        this.isMobilie = true;
        this.isVelo = value === 'Velo';
        this.valueDefaultMobile = '';
        this.valueDefaultImmo = 'none';
        this.updateFieldsManadatoryForm();
        break;
    }
  }

  /**
   * @description initialisation des champs obligatoires
   */
  updateFieldsManadatoryForm() {
    // immobilier
    this.offreForm.get('immobilier').patchValue({
      surface: this.valueDefaultImmo
    });
    // mobile
    this.offreForm.get('mobile').patchValue({
      dateMiseEnCircualtion: !this.isMobilie ? this.valueDefaultDate : this.valueDefaultMobile,
      typeMobileMoteur: this.valueDefaultMobile,
      model: this.valueDefaultMobile
    });
  }

  onSubmit() {
    this.initDataOffreGlobal(this.offreForm.value);
    this.offreService.createOffre(this.offreGlobal).subscribe(
      data => {
        this.sharedService.setConfirmationSubject(data.messageResponse);
      }
    );
  }

  /**
   * init data
   * @param object value offreForm
   */
  initDataOffreGlobal(object: any) {
    if (this.isImmobilier) {
      this.createImmobilier(object);
      this.mobile = null;
    }
    if (this.isMobilie) {
      this.createMobile(object);
      this.immobilier = null;
    }
    this.offreGlobal.immobilier = this.immobilier;
    this.offreGlobal.mobile = this.mobile;
    // test
    this.offreGlobal.email = 'mamoudous2005@yahoo.fr';
  }

  createImmobilier(object: any) {
    this.immobilier.titre = object.offre.titre;
    this.immobilier.surface = object.immobilier.surface;
    this.immobilier.description = object.offre.description;
    this.immobilier.adresse = object.offre.adresse;
    this.immobilier.prix = object.offre.prix;
    this.immobilier.typeAnnonce = object.offre.typeAnnonce;
    this.immobilier.typeOffre = object.offre.typeOffre.toUpperCase();
    this.immobilier.typeServiceOffre = object.offre.typeServiceOffre.toUpperCase();
    this.immobilier.adresse.ville = object.offre.adresse.ville;
    this.immobilier.adresse.pays = object.offre.adresse.pays;
  }

  createMobile(object: any) {
    this.mobile.titre = object.offre.titre;
    this.mobile.description = object.offre.description;
    this.mobile.adresse = object.offre.adresse;
    this.mobile.prix = object.offre.prix;
    this.mobile.dateMiseEnCircualtion = object.mobile.dateMiseEnCircualtion;
    this.mobile.model = object.mobile.model;
    this.mobile.typeMobileMoteur = object.mobile.typeMobileMoteur;
    this.mobile.typeAnnonce = object.offre.typeAnnonce;
    this.mobile.typeOffre = object.offre.typeOffre.toUpperCase();
    this.mobile.typeServiceOffre = object.offre.typeServiceOffre.toUpperCase();
    this.mobile.model = object.offre.model;
    this.mobile.adresse.ville = object.offre.adresse.ville;
    this.mobile.adresse.pays = object.offre.adresse.pays;
  }
}
