import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatMenuModule, MatIconModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatGridListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule, 
    MatMenuModule, 
    MatIconModule, 
    MatCheckboxModule, 
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}