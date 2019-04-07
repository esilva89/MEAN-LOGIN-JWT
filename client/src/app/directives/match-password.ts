// External Modules.
import { FormGroup } from '@angular/forms';

/**
 * Custom validator to check that two fields match.
 * 
 * @function MatchPassword.
 * @param {string} controlName: password.
 * @param {string} matchingControlName: password to be confirm.
 */
export function MatchPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        //? check if the controls are initialize.
        if (!control || !matchingControl) {
            //! error the controls are not initialize.
            return null;
        }

        //? check if other validator found an error.
        if (matchingControl.errors && !matchingControl.errors.matchPassword) {
            //! error exists an error.
            return null;
        }

        //? check if the validation fails.
        if (control.value !== matchingControl.value) {
            //! error in the passwords.
            matchingControl.setErrors({ matchPassword: true });
        } else {
            //* there are no errors.
            matchingControl.setErrors(null);
        }
    }
}