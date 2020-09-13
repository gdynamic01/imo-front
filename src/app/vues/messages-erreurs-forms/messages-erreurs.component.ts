import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alerte-message',
  templateUrl: './messages-erreurs.component.html',
  styleUrls: ['./messages-erreurs.component.scss']
})
export class MessagesErreursComponent implements OnInit {

  @Input() messages: string;
  @Input() colorsMsg: string;

  constructor() { }

  ngOnInit() {
  }

}
