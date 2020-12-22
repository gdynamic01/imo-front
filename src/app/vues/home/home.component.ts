import { OffreSearch } from './../../models/offre/offre';
import { MatSnackBar } from '@angular/material';
import { ErrorsFormGeneriquesService } from './../../errors/errors-form-generiques.service';
import { OffreService } from './../../service/apiImpl/offreimpl/offre.service';
import { SharedService } from './../../shared/shared.service';
import { ImoResponse } from './../../models/response/imo-response';
import { PipeTransformers } from '../../pipes/pipe-transformers';
import { TYPE_SERVICE } from '../../constantes/constantes-datas';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public typesDemandes: string[];
  messageError: string;
  imoResponse: ImoResponse<OffreSearch> = new ImoResponse();
  totalOffre: number = 0;

  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService, private datePipe: PipeTransformers,
              private offreService: OffreService, private errorsService: ErrorsFormGeneriquesService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getOffres();
    this.sharedService.itemSelectedSubject.next('accueil');
    this.errorsService.messageResponse.next(null);
    this.subscriptions.push(this.errorsService.messageResponse.subscribe(
      value => {
        this.messageError = value;
      }
    ));
    // this.typesDemandes = TYPE_SERVICE;
  }

  /**
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
    this.offreService.getListOffre(null).subscribe(
      data => {
        if (!this.errorsService.traitementErreur(data.status, data.messageResponse)) {
          this.totalOffre = data.result.length > 0 ? data.result.length : 0;
          this.imoResponse = data;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

}
