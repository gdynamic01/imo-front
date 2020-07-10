import { Router } from '@angular/router';
import { AuthService } from './../../service/config/auth.service';
import { TokenStorageService } from './../../service/config/token-storage.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { AuthentificationComponent } from '../auth/authentification.component';
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

  constructor(private sharedService: SharedService, private dialog: MatDialog,
              private tokenStorage: TokenStorageService, private router: Router,
              private authService: AuthService
             ) {}

  ngOnInit() {
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
   * @author Mamadou
   * @description Ouverture de la popin
   * @param popin the value popin
   */
  openDialog(popin: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.height = '76%';
    this.dialog.open(AuthentificationComponent, dialogConfig);
  }

  /**
   * @author Mamadou
   * @description deconnecte l'utilisateur
   */
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
