import { SharedService } from './../../shared/shared.service';
import { TYPES_DEMANDES } from '../../constantes/constantes-datas';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormControl} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public typesDemandes: string[];
  date = new FormControl(new Date());

  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private shared: SharedService) {
  }

  ngOnInit() {
    this.shared.initDatePicker('datepicker', 'class');
    this.typesDemandes = TYPES_DEMANDES;
  }

  ngAfterViewInit() {
    this.shared.initSelect('mdb-select', 'class');
  }

}
