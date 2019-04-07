// External Modules.
import { Injectable } from '@angular/core';

// My Modules.
import { CustomFormError } from '../models/custom-form-error';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  /**
   * Set the success message.
   * 
   * @method setSuccessfulMessage.
   * @param {string} timeout: represent the time the message will be visible.
   * @return {any}: return a object with options for show a success message.
   */
  public setSuccessfulMessage(timeout: string): any {
    return { cssClass: 'alert-success', timeout };
  }

  /**
   * Set the danger message.
   * 
   * @method setFailedMessage.
   * @param {string} timeout: represent the time the message will be visible.
   * @return {any}: return a object with options for show a danger message.
   */
  public setFailedMessage(timeout: string): any {
    return { cssClass: 'alert-danger', timeout };
  }

  /**
   * Check if the json object is empty.
   * 
   * @method isEmptyJSON.
   * @param {JSON} json: represent a json object.
   * @return {boolean}: return true if the json object is empty; false otherwise.
   */
  public isEmptyJSON(json: JSON): boolean {
    return Object.entries(json).length === 0 && json.constructor === Object;
  }

  /**
   * Clear the errors of the a form.
   * 
   * @method resetError.
   * @param event: Angular event.
   * @param {CustomFormError} customFormError: represent the object that will store the form errors.
   */
  public resetError(event, customFormError: CustomFormError): void {
    //? check that the form field has an error.
    switch(event.target.name) {
      case 'username':
        customFormError.hideUsername();
        break;
      case 'email':
        customFormError.hideEmail();
        break;
      case 'currentPassword':
        customFormError.hideCurrentPassword();
        break;
      case 'password':
        customFormError.hideNewPassword();
        break;
    }
  }

}
