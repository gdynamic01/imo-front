import { ObjectStorageService } from './../../../service/config/object-storage.service';
import { OffreSearch } from './../../../models/offre/offre';
import { Subscription } from 'rxjs';
import { OffreService } from './../../../service/apiImpl/offreimpl/offre.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-offre',
  templateUrl: './details-offre.component.html',
  styleUrls: ['./details-offre.component.scss']
})
export class DetailsOffreComponent implements OnInit, OnDestroy {

  code: string = null;
  isDetail: boolean;
  isAfficheTelephone: boolean;
  subscriptions: Subscription[] = [];

  offre: OffreSearch = new OffreSearch();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private offreService: OffreService,
              private objectStorageService: ObjectStorageService) { }

  ngOnInit() {
    this.isDetail = false;
    this.isAfficheTelephone = false;
    this.activatedRoute.params.subscribe(params => {
      this.code = params['codeOffre'];
      this.getOffreByCode(this.code);
    });
  }

  /**
   * @description Verification de l'offre
   * @param code code offre
   */
  getOffreByCode(code: string) {
    this.subscriptions.push(this.offreService.getOffreByCode(code).subscribe(
      value => {
        if (value.status === 200) {
          this.isDetail = true;
          this.offre = value.result.pop();
        }
      }
    ))
  }

  afficheTelephone() {
    this.isAfficheTelephone = !this.isAfficheTelephone;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

}
