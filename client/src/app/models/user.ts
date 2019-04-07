/**
* Define the user object.
*
* @class User.
*/
export class User {
    
    _id: number;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    avatar: string;
    captcha: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;

    /**
     * Initialize the user object.
     * 
     * @constructor
     */
    constructor() {
        this._id = -1;
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.firstName = '';
        this.lastName = '';
        this.avatar = '';
        this.captcha = '';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
    }

}