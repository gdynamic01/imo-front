import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private sharedService: SharedService, public dialog: MatDialog
             ) {}

  ngOnInit() {
    this.sharedService.initNavBar('sidenav', 'class'); // initialisation de la navbar
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
}
