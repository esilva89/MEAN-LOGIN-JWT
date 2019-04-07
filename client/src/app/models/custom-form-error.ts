// My Interfaces.
import { PropParamsForm } from './../interfaces/prop-params-form';

export class CustomFormError {

    private username: PropParamsForm;
    private email: PropParamsForm;
    private password: PropParamsForm;
    private currentPassword: PropParamsForm;

    /**
     * Initialize the custom form error object.
     * 
     * @constructor
     */
    constructor() {
        this.username = { show: false, message: '' };
        this.email = { show: false, message: '' };
        this.password = { show: false, message: '' };
        this.currentPassword = { show: false, message: '' };
    }

    /**
     * Show the username error.
     * 
     * @method showUsername.
     * @param {string} message: represent the error message.
     */
    public showUsername(message: string): void {
        this.username = { show: true, message };
    }

    /**
     * Show the email error.
     * 
     * @method showEmail.
     * @param {string} message: represent the error message.
     */
    public showEmail(message: string): void {
        this.email = { show: true, message };
    }

    /**
     * Show the current password error.
     * 
     * @method showCurrentPassword.
     * @param {string} message: represent the error message.
     */
    public showCurrentPassword(message: string): void {
        this.currentPassword = { show: true, message };
    }

    /**
     * Show the new password error.
     * 
     * @method showNewPassword.
     * @param {string} message: represent the error message.
     */
    public showNewPassword(message: string): void {
        this.password = { show: true, message };
    }

    /**
     * Hide the username error.
     * 
     * @method hideUsername.
     */
    public hideUsername(): void {
        this.username = { show: false, message: '' };
    }

    /**
     * Hide the email error.
     * 
     * @method hideEmail.
     */
    public hideEmail(): void {
        this.email = { show: false, message: '' };
    }

    /**
     * Hide the current password error.
     * 
     * @method hideCurrentPassword.
     */
    public hideCurrentPassword(): void {
        this.currentPassword = { show: false, message: '' };
    }

    /**
     * Hide the new password error.
     * 
     * @method hideNewPassword.
     */
    public hideNewPassword(): void {
        this.password = { show: false, message: '' };
    }

}