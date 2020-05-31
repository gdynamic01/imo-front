import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharedCustomValidate {

  /**
   * validation du mot de passe
   * @param c the control formGroup
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
}
