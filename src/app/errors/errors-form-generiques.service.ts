import { Injectable } from '@angular/core';


declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ErrorsFormGeneriquesService {

  constructor() { }

  /**
   *
   * @author Mamadou
   * @description gere les erreurs de saisie du formulaire
   * @param champsOjects est un objet json qui contient tous les champs obligatoires avec les messages d'erreurs a affiché
   * @param cible qui definit l'input
   * @param type qui definit si [class ou id]
   * @return boolean true/false
   *
   */
  public generateErrorsForm(champsOjects: any, cible: string, type: string) {
    const caractere = type === 'class' ? '.' : '#';
    const result = $(caractere + cible);
    result.validate({
      // champs formulaires
      rules: champsOjects[0],
      // messages erreurs
      messages: champsOjects[1],
      errorElement : 'div',
      errorPlacement: function (error, element) {
        const placement = $(element).data('error');
        if (placement) {
          $(placement).append(error);
        } else {
          error.insertAfter(element);
        }
      }
    });
    return result.valid();
  }
}
