import { Router } from '@angular/router';
import { AuthService } from './../../service/config/auth.service';
import { TokenStorageService } from './../../service/config/token-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Subscription } from 'rxjs';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isActifButton = false;
  subscriptions: Subscription[] = [];
  userName: string;
  itemSelected: string = null;

  constructor(private sharedService: SharedService, private authService: AuthService,
              private tokenStorage: TokenStorageService, private router: Router
             ) {}

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
    this.subscriptions.push(this.sharedService.userNameSubject.subscribe(
      value => {
        this.userName = value;
      }
    ));
    if (!this.isActifButton && this.tokenStorage.getToken() !== null && this.tokenStorage.getToken() !== 'undefined') {
      this.isActifButton = true;
    }
  }

  /**
   * @description redirection 
   * @param uri url de redirection
   */
  redirection(uri: string) {
    this.sharedService.redirection(uri);
  }

  /**
   * @description deconnecte l'utilisateur
   */
  deconnexion() {
    this.tokenStorage.signOut();
    this.sharedService.setIsActifElement(false);
    this.sharedService.userNameSubject.next(null);
    this.sharedService.emailSubject.next(null);
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
