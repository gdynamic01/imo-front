import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alerte-message',
  templateUrl: './alerte-message.component.html',
  styleUrls: ['./alerte-message.component.scss']
})
export class AlerteMessageComponent implements OnInit {

  @Input() messages: string;
  @Input() colorsMsg: string;

  constructor() { }

  ngOnInit() {
  }

}
