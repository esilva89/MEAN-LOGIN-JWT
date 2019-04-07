// External Modules.
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

// My Function.
import { MatchPassword } from './match-password';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {

  @Input('appMatchPassword') matchPassword: string[] = [];

  /**
   * Check if two passwords are match.
   * 
   * @method resolved.
   * @param {FormGroup} formGroup: Angular module.
   * @return {ValidationErrors}: return potencials errors.
   */
  validate(formGroup: FormGroup): ValidationErrors {
    return MatchPassword(this.matchPassword[0], this.matchPassword[1])(formGroup);
  }

}