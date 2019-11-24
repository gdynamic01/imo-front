import { TokenStorageService } from './../../service/config/token-storage.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
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

  isActifButton: boolean = false;
  destroySubscription: any;

  constructor(private sharedService: SharedService, private dialog: MatDialog, 
              private tokenStorage: TokenStorageService
             ) {}

  ngOnInit() {
    this.sharedService.initNavBar('sidenav', 'class'); // initialisation de la navbar
    this.destroySubscription = this.sharedService.isEtatUser.subscribe(
      value => {
        this.isActifButton = value;
      }
    );

    
    console.log('_____________ sessionStorage: ', this.isActifButton);
    console.log('_____________ getToken: ', this.tokenStorage.getToken());
  }

  /**
   * @author Mamadou
   * @description Ouverture de la popin
   * @param popin 
   */
  openDialog(popin: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = popin === 'Insc' ? '80%' : '50%';
    if(popin === 'Insc') {
      this.dialog.open(UserInscriptionComponent, dialogConfig);
    }
    if(popin === 'Auth') {
      this.dialog.open(AuthentificationComponent, dialogConfig);
    }
  }

  ngDestroy() {
    if (this.tokenStorage.getToken() == null) {
      this.destroySubscription.unsubscribe();
    }
  }

}
