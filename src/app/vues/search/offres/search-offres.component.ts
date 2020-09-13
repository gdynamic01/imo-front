import { ImoResponse } from './../../../models/response/imo-response';
import { OffreService } from './../../../service/apiImpl/offreimpl/offre.service';
import { Pays, Ville } from './../../../models/adresse';
import { SharedService } from './../../../shared/shared.service';
import { CATEGORIES } from './../../../constantes/constantes-datas';
import { EnumToArrayPipe } from './../../../pipes/pipe-transformers-enum';
import { Immobilier } from './../../../models/offre/offre';
import { MatRadioChange } from '@angular/material';
import { PipeTransformers } from './../../../pipes/pipe-transformers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-offres',
  templateUrl: './search-offres.component.html',
  styleUrls: ['./search-offres.component.scss']
})
export class SearchOffresComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  isLocation: boolean;
  categoriesList = CATEGORIES;
  listPays: Array<Pays> = new Array<Pays>();
  listVilles: Array<Ville> = new Array<Ville>();
  isSelectPays: boolean;

  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private enumToArrays: EnumToArrayPipe, 
              private sharedService: SharedService, private offreService: OffreService) {
    this.isLocation = true;
    this.isSelectPays = false;
  }

  ngOnInit() {
    this.getPays();
    this.initForm();
  }

  getPays() {
    this.subscriptions.push(
      this.offreService.getListPays().subscribe(
        data => {
          if (data !== null) {
            this.listPays = data.result;
          }
        }
      ));
  }

  initForm() {
    this.searchForm = this.fb.group({
      offre: this.fb.group({
        typeServiceOffre: ['LOCATION'],
        ville: [null],
        pays: ['', {validators: Validators.required}],
        dateDebut: [new Date(), Validators.required],
        dateFin: [new Date(), Validators.required],
        categories: [[], {validators: Validators.required}]
      })
    });
  }

  onSelect(event: MatRadioChange) {
    switch (event.value) {
      case 'LOCATION':
        this.isLocation = true;
        this.dateDebut.setValidators(Validators.required);
        this.dateFin.setValidators(Validators.required);
        break;
      case 'VENTE':
        this.isLocation = false;
        this.dateDebut.clearValidators();
        this.dateFin.clearValidators();
        break;
    }
    this.dateDebut.updateValueAndValidity();
    this.dateFin.updateValueAndValidity();
  }

  onSubmit() {
    this.offreService.getListOffre(this.searchForm.value).subscribe(
      response => {
        console.log('_________________ response: ', response);
      }
    );
  }

  onCategorieRemoved(categorie: string) {
    const categories = this.categories.value as string[];
    this.sharedService.removeElement(categories, categorie);
    this.categories.setValue(categories);
  }

  selectPays(event: string) {
    const pays = this.listPays.filter(value => value.nomPays === event);
    this.listVilles = pays[0].villes;
  }

  get offre() {
    return this.searchForm.get('offre');
  }

  get typeServiceOffre() {
    return this.offre.get('typeServiceOffre');
  }

  get pays() {
    return this.offre.get('pays');
  }

  get ville() {
    return this.offre.get('ville');
  }

  get dateDebut() {
    return this.offre.get('dateDebut');
  }

  get dateFin() {
    return this.offre.get('dateFin');
  }

  get categories() {
    return this.offre.get('categories');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

}
