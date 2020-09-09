import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatMenuModule, MatIconModule, MatCheckboxModule,
         MatDatepickerModule, MatCardModule, MatTabsModule, MatToolbarModule,
         MatSelectModule, MatNativeDateModule, MatRadioModule, MatSnackBarModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
