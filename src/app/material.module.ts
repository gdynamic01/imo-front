import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule, MatMenuModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule, MatMenuModule, MatIconModule]
})
export class MaterialModule {}