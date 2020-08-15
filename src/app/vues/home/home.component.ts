import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { OffreService } from './../../service/apiImpl/offreimpl/offre.service';
import { SharedService } from './../../shared/shared.service';
import { ImoResponse } from './../../models/response/imo-response';
import { PipeTransformers } from '../../pipes/pipe-transformers';
import { Offre, TypeOffreEnum, TypeServiceEnum } from '../../models/offre/offre';
import { TYPE_SERVICE } from '../../constantes/constantes-datas';
import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public typesDemandes: string[];

  messageError: string;

  imoResponse: ImoResponse<Offre> = new ImoResponse<Offre>();

  constructor(private sharedService: SharedService, private datePipe: PipeTransformers,
              private offreService: OffreService, private errorsService: ErrorsFormGeneriquesService) {
  }

  ngOnInit() {
    this.sharedService.itemSelectedSubject.next('accueil');
    this.errorsService.messageResponse.next(null);
    this.errorsService.messageResponse.subscribe(
      value => {
        this.messageError = value;
      }
    );
    this.typesDemandes = TYPE_SERVICE;
    this.getOffres();
  }

  /**
   * @author Mamadou
   * @description Gestion des dates
   * @param date the date value
   */
  convertDate(jour: number, date: Date) {
    switch (jour) {
      case 0:
        return 'Aujourdh\'hui à ' + this.datePipe.transform(date, 'h:mm');
        break;
        case 1:
          return 'Hier à ' + this.datePipe.transform(date, 'h:mm');
          break;
          default:
            return this.datePipe.transform(date, 'dd MMM yyyy à h:mm');
            break;
    }
  }

  getOffres() {
    this.offreService.getListOffre().subscribe(
      data => {
        if (!this.errorsService.traitementErreur(data.statut, data.messageResponse)) {
          this.imoResponse = data;
        }
      }
    );
  }

}
