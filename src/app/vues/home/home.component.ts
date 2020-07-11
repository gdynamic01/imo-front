import { Immobilier } from './../../models/offre/offre';
import { ImoResponse } from './../../models/response/imo-response';
import { PipeTransformers } from '../../pipes/pipe-transformers';
import { Offre, TypeOffreEnum, TypeServiceEnum, TypeBienImmobilierEnum } from '../../models/offre/offre';
import { SharedService } from './../../shared/shared.service';
import { TYPE_SERVICE } from '../../constantes/constantes-datas';
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public typesDemandes: string[];
  offres: Array<Offre> = new Array();

  imoResponse: ImoResponse<Offre> = new ImoResponse<Offre>();

  constructor(private shared: SharedService, private datePipe: PipeTransformers) {
  }

  ngOnInit() {
    this.shared.initDatePicker('datepicker', 'class');
    this.typesDemandes = TYPE_SERVICE;
    this.bouchonOffre();
  }

  ngAfterViewInit() {
    this.shared.initSelect('mdb-select', 'class');
  }

  /**
   * @author Mamadou
   * @description Gestion des dates
   * @param date 
   */
  convertDate(date: Date) {
    let nbJour = this.shared.convertDate(date);
    if(nbJour === '1' || nbJour === '0') {
       return "Aujourdh'hui à "+ this.datePipe.transform(date, 'h:mm');
    } else if(nbJour === '2') {
      return 'Hier à '+ this.datePipe.transform(date, 'h:mm');
    } else {
      return this.datePipe.transform(date, 'dd MMM yyyy à h:mm');
    }
  }

  bouchonOffre() {
    this.offres = [
      {
        'titre':"annnoce 1",
        'adresse': {
          'codePostal': 93270,
          'complementAdresse':'',
          'libelleRue': '',
          'numeroRue': '',
          'pays':'France',
          'ville': 'Sevran'
        },
        'createAt': new Date('2019/12/14'),
        'description': 'une belle voiture',
        'prix':52,
        'typeOffre':TypeOffreEnum.Mobile,
        'updateAt': new Date('2019/12/14'),
        'typeAnnonce': 'Particulier',
        'typeServiceOffre': TypeServiceEnum.Vente,
        'photosOffres': ['url.png', 'url2.png'],
        'symboleMonetaire': 'EUR'
      },
      {
        'titre':"annnoce 2",
        'adresse': {
          'codePostal': 93220,
          'complementAdresse':'',
          'libelleRue': '',
          'numeroRue': '',
          'pays':'France',
          'ville': 'Aulnay'
        },
        'createAt': new Date('2019/12/06'),
        'description': 'une belle voiture',
        'prix':200,
        'typeOffre':TypeOffreEnum.Mobile,
        'updateAt': new Date('2019/12/06'),
        'typeAnnonce': 'Professionnel',
        'typeServiceOffre': TypeServiceEnum.Location,
        'photosOffres': ['url.png', 'url2.png'],
        'symboleMonetaire': 'EUR'
      },
      {
        'titre':"annnoce 3",
        'adresse': {
          'codePostal': 94170,
          'complementAdresse':'',
          'libelleRue': '',
          'numeroRue': '',
          'pays':'France',
          'ville': 'Villeneuve-saint-georges'
        },
        'createAt': new Date('2019/12/05'),
        'description': 'une maison neuve',
        'prix':52,
        'typeOffre':TypeOffreEnum.Immobilier,
        'updateAt': new Date('2019/12/05'),
        'typeAnnonce': 'Particulier',
        'typeServiceOffre': TypeServiceEnum.Vente,
        'photosOffres': ['url.png', 'url2.png'],
        'symboleMonetaire': 'FR Gui'
      },
      {
        'titre':"annnoce 4",
        'adresse': {
          'codePostal': 95400,
          'complementAdresse':'',
          'libelleRue': '',
          'numeroRue': '',
          'pays':'France',
          'ville': 'Cergy Pontoise'
        },
        'createAt': new Date('2019/12/04'),
        'description': 'vente velo',
        'prix':52,
        'typeOffre':TypeOffreEnum.Mobile,
        'updateAt': new Date('2019/12/04'),
        'typeAnnonce': 'Professionnel',
        'typeServiceOffre': TypeServiceEnum.Location,
        'photosOffres': ['url.png', 'url2.png'],
        'symboleMonetaire': 'FR Gui'
      }
    ];
    this.imoResponse.result = this.offres;
    this.imoResponse.nbOffre = 4;
    this.imoResponse.nbOffreParticulier = 2253654;
    this.imoResponse.nbOffreProfessionnel = 2253654;
  }

}
