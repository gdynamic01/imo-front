import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatMenuModule, MatIconModule, MatCheckboxModule, MatDatepickerModule, MatCardModule, MatGridListModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
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
    FlexLayoutModule
  ]
})
export class MaterialModule {}