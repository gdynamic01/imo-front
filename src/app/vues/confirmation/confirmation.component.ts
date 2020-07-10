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
  }

  ngDestroy() {
    this.destroySubscription.unsubscribe();
  }

}
