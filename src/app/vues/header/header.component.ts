import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('modal', {static: false}) modal: ElementRef;
  instance: any;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.sharedService.initNavBar('sidenav', 'class'); // initialisation de la navbar
  }

  // Lancement des composants apres initialisation
  ngAfterViewInit(): void{
    this.sharedService.initModal(this.modal); // initialisation du modal inscription
    this.instance = this.sharedService.getInstances(this.modal);
  }

  /**
   * 
   * @author Mamadou
   * @description fermeture de la popin
   * 
   */
  clos() {
    this.instance.close();
  }

  /**
   * 
   * @author Mamadou
   * @description affiche le composant confirmation creation compte
   * @param event message confirmation
   * 
   */
  confirmationCreationCompte(event: string) {
    this.clos();
    this.sharedService.setConfirmationSubject(event);
    this.router.navigate(['/confirmation']);
  }

}
