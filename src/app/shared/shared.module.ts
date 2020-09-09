import { AlerteMessageComponent } from './../vues/alerte-message/alerte-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AlerteMessageComponent],
  imports: [
    CommonModule
  ],
  exports: [AlerteMessageComponent]
})
export class SharedModule { }
