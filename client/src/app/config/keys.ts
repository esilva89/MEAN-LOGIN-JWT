/**
* Define the constants that will be used in the services.
*
* @class Keys.
*/
export class Keys {
    
    public static matchPassword: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$";
    public static serverUrl: string = 'http://localhost:5000';
    public static signUp: string = '/user/signup';
    public static signIn: string = '/user/signin';
    public static profile: string = '/user';
    public static editProfile: string = '/user/profile';
    public static editPassword: string = '/user/password';
    public static removeUser: string = '/user';
    
};