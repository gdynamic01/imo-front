import { PAYS_AVEC_ADRESSE_COMPLETE } from './../../constantes/constantes-datas';
import { PipeTransformers } from './../../pipes/pipe-transformers';
import { TypeBienImmobilierEnum, TypeSanitaireEnum } from './../../models/offre/offre';
import { SharedService } from './../../shared/shared.service';
import { OffreService } from './../../service/apiImpl/offreimpl/offre.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OffreGlobal, Offre, Immobilier, Mobile, TypeOffreEnum, TypeServiceEnum, TypeMobileMoteurEnum } from '../../models/offre/offre';
import { EnumToArrayPipe } from '../../pipes/pipe-transformers-enum';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {

  offreForm: FormGroup;
  offreGlobal: OffreGlobal = new OffreGlobal();
  immo: Immobilier = new Immobilier();
  typeSanitaireEnum = TypeSanitaireEnum;
  mobiles: Mobile = new Mobile();
  typeOffreEnum = TypeOffreEnum;
  typeServiceEnum = TypeServiceEnum;
  typeMobileMoteurEnum = TypeMobileMoteurEnum;
  typeDeBienImmobilier = TypeBienImmobilierEnum;
  isImmobilier: boolean;
  isMobilie: boolean;
  isVelo: boolean;
  valueDefaultDate = new Date();
  isVente: boolean;
  isTerrain: boolean;

  isElectricite: boolean;
  isEau: boolean;
  isPiscine: boolean;
  isServiceMenage: boolean;
  isParking: boolean;
  isAdresseObligatoire: boolean;

  isLocation: boolean;

  minDate = new Date();

  constructor(private fb: FormBuilder, private enumToArrays: EnumToArrayPipe,
              private offreService: OffreService, private sharedService: SharedService,
              private dateFormat: PipeTransformers) {
                this.isVente = false;
                this.isTerrain = false;
                this.isLocation = false;
                // immobilier
                this.isElectricite = true;
                this.isEau = true;
                this.isPiscine = false;
                this.isServiceMenage = false;
                this.isParking = false;
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
        titre: ['', {validators: Validators.required}],
        typeOffre: ['', {validators: Validators.required}],
        typeServiceOffre: ['', {validators: Validators.required}],
        description: [''],
        prix: ['', {validators: Validators.required}],
        adresse: this.fb.group({
          libelleRue: [''],
          numeroRue: [''],
          codePostal: [''],
          ville: ['', {validators: Validators.required}],
          pays: ['', {validators: Validators.required}]
        }),
        dateDebut: [this.dateFormat.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
        dateFin: [this.dateFormat.transform(new Date(), 'yyyy-MM-dd'), Validators.required]
      }),
      immobilier: this.fb.group ({
        bien: ['', {validators: Validators.required}],
        surface: ['', {validators: Validators.required}],
        parking: ['non'],
        serviceMenage: ['non'],
        eau: ['oui'],
        electricite: ['oui'],
        zoneGeographique: [''],
        piscine: ['non'],
        sanitaire: ['', {validators: Validators.required}],
        nombrePieces: ['', {validators: Validators.required}],
        autreService: ['']
      }),
      mobile: this.fb.group({
        dateMiseEnCircualtion: ['', {validators: Validators.required}],
        typeMobileMoteur: ['', {validators: Validators.required}]
      })
    });
  }

  selectService(value: string) {
    this.isVente = value === 'VENTE';
    if (value === 'LOCATION') {
      this.isLocation = true;
    } else {
      this.isLocation = false;
      this.isVente = true;
      this.dateDebut.clearValidators();
      this.dateFin.clearValidators();
      this.dateDebut.updateValueAndValidity();
      this.dateFin.updateValueAndValidity();
    }
  }

  selectChangeBienImmo(value: string) {
    this.isTerrain = (this.isVente && value === 'Terrain');
   }

  /**
   * @description display the block corresponding to the type of offer
   * @param event the typeOffre value
   */
  selectChange(value: any) {
    switch (value) {
      case 'MOBILE':
        this.isImmobilier = false;
        this.isMobilie = true;
        this.isVelo = value === 'Velo';
        this.updateFieldsManadatoryForm();
        break;
      case 'IMMOBILIER':
        this.isImmobilier = true;
        this.isMobilie = false;
        this.updateFieldsManadatoryForm();
        break;
    }
  }

  onKey(event: any) {
    if (PAYS_AVEC_ADRESSE_COMPLETE.includes(event)) {
      this.libelleRue.setValidators(Validators.required);
      this.codePostal.setValidators(Validators.required);
      this.numeroRue.setValidators(Validators.required);
      this.isAdresseObligatoire = true;
    } else {
      this.libelleRue.clearValidators();
      this.codePostal.clearValidators();
      this.numeroRue.clearValidators();
      this.isAdresseObligatoire = false;
    }
    this.libelleRue.updateValueAndValidity();
    this.codePostal.updateValueAndValidity();
    this.numeroRue.updateValueAndValidity();
  }

  /**
   * @Description initialisation des champs obligatoires
   */
  updateFieldsManadatoryForm() {
    // immobilier
    if (this.isImmobilier) {
      this.dateMiseEnCircualtion.clearValidators();
      this.typeMobileMoteur.clearValidators();
      this.typeMobileMoteur.updateValueAndValidity();
      this.dateMiseEnCircualtion.updateValueAndValidity();
    }
    if (this.isMobilie) {
      this.surface.clearValidators();
      this.surface.updateValueAndValidity();
      this.immobilier.get('sanitaire').clearValidators();
      this.immobilier.get('sanitaire').updateValueAndValidity();
    }
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
      this.mobiles = null;
    }
    if (this.isMobilie) {
      this.createMobile(object);
      this.immo = null;
    }
    this.offreGlobal.immobilier = this.immo;
    this.offreGlobal.mobile = this.mobiles;
    // test
    this.offreGlobal.email = 'mamoudous2005@yahoo.fr';
  }

  createImmobilier(object) {
    this.immo.titre = object.offre.titre;
    this.immo.surface = object.immobilier.surface;
    this.immo.description = object.offre.description;
    this.immo.adresse = object.offre.adresse;
    this.immo.prix = object.offre.prix;
    this.immo.typeAnnonce = object.offre.typeAnnonce;
    this.immo.typeOffre = object.offre.typeOffre.toUpperCase();
    this.immo.typeServiceOffre = object.offre.typeServiceOffre.toUpperCase();
    this.immo.adresse.ville = object.offre.adresse.ville;
    this.immo.adresse.pays = object.offre.adresse.pays;

    this.immo.eau = object.immobilier.eau === 'oui' ? true : false;
    this.immo.electricite = object.immobilier.electricite === 'oui' ? true : false;
    this.immo.parking = object.immobilier.parking === 'oui' ? true : false;
    this.immo.sanitaire = object.immobilier.sanitaire;
    this.immo.zoneGeographique = object.immobilier.zoneGeographique;
    this.immo.serviceMenage = object.immobilier.serviceMenage === 'oui' ? true : false;
    this.immo.typeDeBien = object.immobilier.bien;
    this.immo.nbrePieces = object.immobilier.nombrePieces;
    this.immo.piscine = object.immobilier.piscine === 'oui' ? true : false;
    this.immo.autreService = object.immobilier.autreService;
    this.immo.dateDebut = object.offre.dateDebut;
    this.immo.dateFin = object.offre.dateFin;
  }

  createMobile(object: any) {
    this.mobiles.titre = object.offre.titre;
    this.mobiles.description = object.offre.description;
    this.mobiles.adresse = object.offre.adresse;
    this.mobiles.prix = object.offre.prix;
    this.mobiles.dateMiseEnCircualtion = object.mobile.dateMiseEnCircualtion;
    this.mobiles.model = object.mobile.model;
    this.mobiles.typeMobileMoteur = object.mobile.typeMobileMoteur;
    this.mobiles.typeAnnonce = object.offre.typeAnnonce;
    this.mobiles.typeOffre = object.offre.typeOffre.toUpperCase();
    this.mobiles.typeServiceOffre = object.offre.typeServiceOffre.toUpperCase();
    this.mobiles.adresse.ville = object.offre.adresse.ville;
    this.mobiles.adresse.pays = object.offre.adresse.pays;
    this.mobiles.dateDebut = object.offre.dateDebut;
    this.mobiles.dateFin = object.offre.dateFin;
  }

  get offre() {
    return this.offreForm.get('offre');
  }

  get mobile() {
    return this.offreForm.get('mobile');
  }

  get immobilier() {
    return this.offreForm.get('immobilier');
  }

  get adresse() {
    return this.offreForm.get('offre').get('adresse');
  }

  get pays() {
    return this.adresse.get('pays');
  }

  get codePostal() {
    return this.adresse.get('codePostal');
  }

  get ville() {
    return this.adresse.get('ville');
  }

  get libelleRue() {
    return this.adresse.get('libelleRue');
  }

  get numeroRue() {
    return this.adresse.get('numeroRue');
  }

  get prix() {
    return this.offre.get('prix');
  }

  get typeServiceOffre() {
    return this.offre.get('typeServiceOffre');
  }

  get dateDebut() {
    return this.offre.get('dateDebut');
  }

  get dateFin() {
    return this.offre.get('dateFin');
  }

  get typeOffre() {
    return this.offre.get('typeOffre');
  }

  get titre() {
    return this.offre.get('titre');
  }

  get surface() {
    return this.immobilier.get('surface');
  }

  get nombrePieces() {
    return this.immobilier.get('nombrePieces');
  }

  get zoneGeographique() {
    return this.immobilier.get('zoneGeographique');
  }

  get typeMobileMoteur() {
    return this.mobile.get('typeMobileMoteur');
  }

  get dateMiseEnCircualtion() {
    return this.mobile.get('dateMiseEnCircualtion');
  }
}
