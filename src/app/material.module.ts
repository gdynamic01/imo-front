import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatMenuModule, MatIconModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatGridListModule, MatSelectModule } from '@angular/material';
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
    MatSelectModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}