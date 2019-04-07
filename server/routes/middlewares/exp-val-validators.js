// External Libs.
const { check } = require('express-validator/check');

// My Keys.
const keys = require('../../config/keys');

// Define the express-validator validators that will be used in the different routes.
module.exports = {

    user: {
        post: {
            signup: [
                check('username').isLength({ min: 5 }),
                check('email').isEmail(),
                check('password').isLength({ min: 8 }),
                check('password').matches(keys.db.regex.matchPassword),
                check('password').custom((value, {req, loc, path}) => {
                    //? check if the passwords match.
                    if(value !== req.body.confirmPassword) {
                        throw new Error("Passwords do not match");
                    } else {
                        return value;
                    }
                })
            ],
            signin: [
                check('email').isEmail(),
                check('password').isLength({ min: 8 }),
                check('password').matches(keys.db.regex.matchPassword)
            ]
        },
        put: {
            profile: [
                check('username').isLength({ min: 5 }),
                check('email').isEmail()
            ],
            password: [
                check('currentPassword').isLength({ min: 8 }),
                check('currentPassword').matches(keys.db.regex.matchPassword),
                check('newPassword').isLength({ min: 8 }),
                check('newPassword').matches(keys.db.regex.matchPassword),
                check('newPassword').custom((value, {req, loc, path}) => {
                    //? check if the passwords match.
                    if(value !== req.body.confirmNewPassword) {
                        throw new Error("New password and confirm new password don't match");
                    } else {
                        return value;
                    }
                })
            ]
        }
    }
    
};