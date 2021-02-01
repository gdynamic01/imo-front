import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectStorageService {

  constructor() { }

  /**
   * @description 
   * @param value 
   * @param key 
   */
  public saveLocalStorage(value: string, key: string) {
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key,  value);
  }

  /**
   * @description recuperation de la valeur
   * @param key clef de la valeur dans le localStorage
   */
  public getValue(key: string): string {
    return localStorage.getItem(key);
  }

  /**
   * @description suppression de l'item dans localStorage
   * @param key clef de stockage dans localStorage
   */
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

}
