import { HttpErrorResponse } from '@angular/common/http';
import { UtilisateurService } from './../service/apiImpl/userimpl/utilisateur.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedCustomValidate {

  emailExReg = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';

  constructor(private utilisaterService: UtilisateurService) {

  }

  /**
   * validation du mot de passe
   */
  passwordValidate(): AsyncValidatorFn {
    return (c: AbstractControl): | Promise<{ invalid: boolean } | null>| Observable<{ [key: string]: any } | null> => {
      if (c.get('password') !== null && c.get('confirmPassword') !== null
          && c.get('password').value !== c.get('confirmPassword').value) {
          return of({invalid: true});
      }
      return of(null);
    };
  }

  /**
   * verification que l'email existe
   * @returns boolean value or null
   */
  checkMailNotExist(): AsyncValidatorFn {
    return (c: AbstractControl): | Promise<{ notExist: boolean } | null>| Observable<{ [key: string]: any } | null> => {
      return this.utilisaterService.getEmail(c.value).pipe(
        map(
          res => {
            return (res === null) ? { notExist: true } : null;
          }
        ), catchError (
          err => {
            return of({ notExist: true });
          }
        ));
    };
  }

  /**
   * verification que l'email n'existe pas
   * @returns boolean value or null
   */
  checkMailExist(): AsyncValidatorFn {
    return (c: AbstractControl): | Promise<{ exist: boolean } | null>| Observable<{ [key: string]: any } | null> => {
      return this.utilisaterService.getEmail(c.value).pipe(
        map(
          res => {
            return (res !== null && res.statut === 200) ? { exist: true } : null;
          }
        ));
    };
  }



}
