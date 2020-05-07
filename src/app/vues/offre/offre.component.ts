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

  constructor(private fb: FormBuilder, private enumToArrays: EnumToArrayPipe ) {
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
          ville: ['']
        })
      }),
      immobilier: this.fb.group ({
        surface: ['', Validators.required]
      }),
      mobile: this.fb.group({
        dateMiseEnCircualtion: ['', Validators.required],
        typeMobileMoteur: ['', Validators.required],
        model: ['']
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
    });
  }

  onSubmit() {
    this.initDataOffreGlobal(this.offreForm.value);
    console.log('________ form: ', this.offreForm.value);
  }

  /**
   * init data
   * @param object value offreForm
   */
  initDataOffreGlobal(object: any) {
    if (this.isImmobilier) {
      this.immobilier.surface = object.immobilier.surface;
      this.immobilier.description = object.offre.description;
      this.immobilier.adresse = object.offre.adresse;
      this.immobilier.prix = object.offre.prix;
      this.mobile = null;
    }
    if (this.isMobilie) {
      this.mobile.description = object.offre.description;
      this.mobile.adresse = object.offre.adresse;
      this.mobile.prix = object.offre.prix;
      this.mobile.dateMiseEnCircualtion = object.mobile.dateMiseEnCircualtion;
      this.mobile.model = object.mobile.model;
      this.mobile.typeMobileMoteur = object.mobile.typeMobileMoteur;
      this.immobilier = null;
    }
    this.offreGlobal.immobilier = this.immobilier;
    this.offreGlobal.mobile = this.mobile;
    // test
    // this.offreGlobal.email = 
  }
}
