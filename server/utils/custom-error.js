// External Libs.
const { validationResult } = require('express-validator/check');

// My Modules.
const customResponse = require('./custom-response');
const { User } = require('../db/models');

// Define the methods of my custom errors.
const customError = {};

/**
 * Check if the username or email already in use.
 *
 * @method checkExistsUsernameAndEmail.
 * @param user: a user model.
 * @param username: a string characters.
 * @param email: a string characters.
 * @return data: a JSON with the errors.
 */
customError.checkExistsUsernameAndEmail = async (user, username, email) => {
    let data = {};
    let userUsername = await User.findOne({ username });
    let userEmail = await User.findOne({ email });
    
    if(user) {
        if(userUsername && !user._id.equals(userUsername._id)) {
            //! error in the username.
            data.username = 'Username is already in use';
        }
        if(userEmail && !user._id.equals(userEmail._id)) {
            //! error in the email.
            data.email = 'Email is already in use';
        }
    } else {
        if(userUsername) {
            //! error in the username.
            data.username = 'Username is already in use';
        }
        if(userEmail) {
            //! error in the email.
            data.email = 'Email is already in use';
        }
    }
    return data;
};

/**
 * Parse express-validator errors.
 * 
 * @method parseUserErrExpValidator.
 * @param req: Request object send by client.
 * @return data: a JSON with the errors.
 */
customError.parseUserErrExpValidator = (req) => {
    let data = {};
    let errors = validationResult(req);

    //? check if exists errors in the inputs.
    if(!errors.isEmpty()) {
        //! errors detected by express-validator.
        for(let i = 0; i < errors.array().length; i++) {
            switch(errors.array()[i].param) {
                case "username":
                        data.username = errors.array()[i].msg;
                    break;
                case "email":
                        data.email = errors.array()[i].msg;
                    break;
                case "password":
                        data.password = errors.array()[i].msg;
                    break;
                case "currentPassword":
                        data.currentPassword = errors.array()[i].msg;
                    break;
                case "newPassword":
                    data.newPassword = errors.array()[i].msg;
                break;
            }
        }
    }
    return data;
};

/**
 * Parse mongo-validator errors.
 * * successful parse errors.
 * ! error internal server error.
 * 
 * @method parseUserErrMongoValidator.
 * @param err: Error object generate by mongo-validator.
 * @return res: a JSON with the errors.
 */
customError.parseUserErrMongoValidator = (err) => {
    let data = {};
    let customRes;

    //? check if is a mongoose-validator error.
    if(err.errors !== undefined) {
        //? check if exists a error in the username.
        if(err.errors.username !== undefined) {
            data.username = err.errors.username.message;
        }
        //? check if exists a error in the email.
        if(err.errors.email !== undefined) {
            data.email = err.errors.email.message;
        }
        //? check if exists a error in the password.
        if(err.errors.password !== undefined) {
            data.password = err.errors.password.message;
        }
        res = {
            status: 422,
            msg: 'There are errors in the form',
            data
        };
    } else {
        //! other error type.
        res = {
            status: 500,
            msg: 'Internal Server Error',
            data
        };
    }
    return res;
};

module.exports = customError;