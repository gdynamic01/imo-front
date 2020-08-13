import { AuthentificationComponent } from './../vues/auth/authentification.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedPopinGeneriques {

    constructor(private dialog: MatDialog) {}

    /**
     * @author Mamadou
     * @description Ouverture de la popin
     * @param popin the value popin
     */
    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        dialogConfig.height = '76%';
        this.dialog.open(AuthentificationComponent, dialogConfig);
    }

}
