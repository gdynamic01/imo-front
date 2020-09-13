import { MessagesErreursComponent } from './../vues/messages-erreurs-forms/messages-erreurs.component';
import { EnumToArrayPipe } from './../pipes/pipe-transformers-enum';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MessagesErreursComponent, EnumToArrayPipe],
  imports: [
    CommonModule
  ],
  exports: [MessagesErreursComponent, EnumToArrayPipe],
  providers: [
    {provide: EnumToArrayPipe}
  ]
})
export class SharedModule { }
