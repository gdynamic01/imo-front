import { Router } from '@angular/router';
import { TokenStorageService } from './../../service/config/token-storage.service';
import { AuthService } from './../../service/config/auth.service';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-responsive',
  templateUrl: './menu-responsive.component.html',
  styleUrls: ['./menu-responsive.component.scss']
})
export class MenuResponsiveComponent implements OnInit, OnDestroy {

  isActifButton = false;
  itemSelected: string = null;
  userName: string;

  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService, private authService: AuthService,
              private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.sharedService.itemSelectedSubject.subscribe(
      value => {
        this.itemSelected = value;
      }
    ));
    this.subscriptions.push(this.sharedService.isActifElement.subscribe(
      value => {
        this.isActifButton = value;
      }
    ));
    this.sharedService.setInfosUsers(this.authService.getInfoUser());
    if (!this.isActifButton && this.tokenStorage.getToken() !== null && this.tokenStorage.getToken() !== 'undefined') {
      this.isActifButton = true;
    }
  }

  redirection(uri: string) {
    if (this.userName === null && uri === 'creation-offre') {
      uri = 'connexion';
      this.sharedService.itemSelectedSubject.next('connexion');
    } else if (this.userName !== null && uri === 'creation-offre') {
      this.sharedService.itemSelectedSubject.next('creation-offre');
    }
    this.sharedService.redirection(uri);
  }

  deconnexion() {
    this.tokenStorage.signOut();
    this.sharedService.setIsActifElement(false);
    this.sharedService.userNameSubject.next(null);
    this.userName = null;
    this.router.navigate(['accueil']);
  }

  ngOnDestroy() {
    if (this.tokenStorage.getToken() == null) {
      this.subscriptions.forEach(
        subscription => subscription.unsubscribe()
      );
    }
  }

}
