// External Modules.
import { isNullOrUndefined } from "util";

export class CustomServerResponse {

    private status: number;
    private message: string;
    private body: any;
    private method: string;
    private line: number;

    /**
     * Initialize the custom server response object.
     * 
     * @constructor
     * @param {number} status: represent the status of the response.
     * @param {string} message: represent the message of the response.
     * @param {any} body: represent the data of the response.
     * @param {string} method: represent the method that failed.
     * @param {string} line: represent the line that failed.
     */
    constructor(status: number, message: string, body: any, method?: string, line?: number) {
        this.status = status;
        this.message = message;
        this.body = body;
        if(!isNullOrUndefined(method) && !isNullOrUndefined(line)) {
            this.method = method;
            this.line = line;
        } else {
            this.method = '';
            this.line = -1;
        }
    }

    /**
     * Get the status of the response.
     * 
     * @method showUsername.
     * @return {number}: return the status of the response.
     */
    public getStatus(): number {
        return this.status;
    }

    /**
     * Get the message of the response.
     * 
     * @method getMessage.
     * @return {string}: return the message of the response.
     */
    public getMessage(): string {
        return this.message;
    }

    /**
     * Get the data of the response.
     * 
     * @method getBody.
     * @return {any}: return the data of the response.
     */
    public getBody(): any {
        return this.body;
    }

    /**
     * Get the method that failed.
     * 
     * @method getMethod.
     * @return {string}: return the method that failed.
     */
    public getMethod(): string {
        return this.method;
    }

    /**
     * Get the line that failed.
     * 
     * @method getLine.
     * @return {number}: return the line that failed.
     */
    public getLine(): number {
        return this.line;
    }

    /**
     * Check if there are error in the username.
     * 
     * @method hasUsernameError.
     * @return {boolean}: return true if there are error in the username; false otherwise.
     */
    public hasUsernameError(): boolean {
        return this.body.hasOwnProperty('username') && this.body.username != '';
    }

    /**
     * Check if there are error in the email.
     * 
     * @method hasEmailError.
     * @return {boolean}: return true if there are error in the email; false otherwise.
     */
    public hasEmailError(): boolean {
        return this.body.hasOwnProperty('email') && this.body.email != '';
    }

    /**
     * Check if there are error in the current password.
     * 
     * @method hasCurrentPasswordError.
     * @return {boolean}: return true if there are error in the current password; false otherwise.
     */
    public hasCurrentPasswordError(): boolean {
        return this.body.hasOwnProperty('currentPassword') && this.body.currentPassword != '';
    }

    /**
     * Check if there are error in the new password.
     * 
     * @method hasNewPasswordError.
     * @return {boolean}: return true if there are error in the new password; false otherwise.
     */
    public hasNewPasswordError(): boolean {
        return this.body.hasOwnProperty('password') && this.body.password != '';
    }

    /**
     * Cast to string the info of the response.
     * 
     * @method toStringCustomServerResponse.
     * @return {string}: return the info of the response.
     */
    public toStringCustomServerResponse(): string {
        let customServerResponse: string;
        customServerResponse = `Error Status: ${this.status}\n`;
        customServerResponse += `Message: ${this.message}\n`;
        customServerResponse += `Method: ${this.method}\n`;
        customServerResponse += `Line: ${this.line}\n`;
        return customServerResponse;
    }

}
