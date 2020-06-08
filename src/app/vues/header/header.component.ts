import { Router } from '@angular/router';
import { AuthService } from './../../service/config/auth.service';
import { TokenStorageService } from './../../service/config/token-storage.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { UserInscriptionComponent } from '../user/user-inscription.component';
import { AuthentificationComponent } from '../auth/authentification.component';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isActifButton = false;
  destroySubscription: any;

  constructor(private sharedService: SharedService, private dialog: MatDialog,
              private tokenStorage: TokenStorageService, private router: Router,
              private authService: AuthService
             ) {}

  ngOnInit() {
    this.sharedService.initNavBar('sidenav', 'class'); // initialisation de la navbar
    this.destroySubscription = this.sharedService.isActifElement.subscribe(
      value => {
        this.isActifButton = value;
      }
    );

    this.sharedService.getUserName(this.authService.getInfoUser());
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
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = popin === 'Insc' ? '70%' : '50%';
    if(popin === 'Insc') {
      this.dialog.open(UserInscriptionComponent, dialogConfig);
    }
    if(popin === 'Auth') {
      this.dialog.open(AuthentificationComponent, dialogConfig);
    }
  }

  /**
   * @author Mamadou
   * @description deconnecte l'utilisateur
   */
  deconnexion() {
    this.tokenStorage.signOut();
    this.sharedService.setIsActifElement(false);
    this.sharedService.userName = null;
    this.router.navigate(['accueil']);
  }

  /**
   * @author Mamadou
   * @description unsubscribe l observable
   */
  ngDestroy() {
    if (this.tokenStorage.getToken() == null) {
      this.destroySubscription.unsubscribe();
    }
  }

}
