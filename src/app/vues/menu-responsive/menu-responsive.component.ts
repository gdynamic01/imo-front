import { TokenStorageService } from './../../service/config/token-storage.service';
import { AuthService } from './../../service/config/auth.service';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-responsive',
  templateUrl: './menu-responsive.component.html',
  styleUrls: ['./menu-responsive.component.scss']
})
export class MenuResponsiveComponent implements OnInit {

  isActifButton = false;
  subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService, private authService: AuthService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
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

}
