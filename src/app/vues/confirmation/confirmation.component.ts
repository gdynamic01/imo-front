import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  confirmationMessage: string;

  destroySubscription: any;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.destroySubscription = this.sharedService.currentConfirmationMessage.subscribe(
      value => {
        this.confirmationMessage = value;
      }
    );
    if(this.confirmationMessage === null) {
      this.router.navigate(['/accueil']);
    } else {
      this.sharedService.setIsActifElement(true);
    }
    
  }

  ngDestroy() {
    this.destroySubscription.unsubscribe();
  }

}
