import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private sharedService: SharedService, @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {}

}
