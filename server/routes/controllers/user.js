// My Modules.
const { User } = require('../../db/models');
const { userService } = require('../../services');
const { customError, customResponse, helpers } = require('../../utils');

// Define the methods of my user controller.
const ctrl = {};

/**
 * Register a new user in the database.
 * * succesful new user in the database.
 * ! error express-validator.
 * ! error username or email.
 * ! error mongoose-validator
 * 
 * @method signUp.
 * @param req: request send by the client with the username, email, password and password confirmed.
 * @param res: response send to the client with the info of message.
 */
ctrl.signUp = async (req, res) => {
    let { username, email, password } = req.body;
    let newUser;
    let data, customRes;
    let parseErrExp, parseErrMongo;

    parseErrExp = customError.parseUserErrExpValidator(req);
    //? check if exist errors express-validator.
    if(helpers.isEmptyJSON(parseErrExp)) {
        data = await customError.checkExistsUsernameAndEmail(null, username, email);
        //? check if the username or email already in use.
        if(!helpers.isEmptyJSON(data)) {
            //! errors username or email already in use.
            customRes = customResponse.setCustomResponse(422, 'The username or the email is already in use', data, 'signUp', 1, false);
            return res.status(422).send(customRes);
        } else {
            try {
                //* save a new User.
                newUser = new User({ username, email, password });
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                customRes = customResponse.setCustomResponse(201, 'You have been registered', {}, 'signUp', 2, false);
                return res.status(201).send(customRes);
            } catch(err) {
                //! errors detected by mongoose-validator.
                parseErrMongo = customError.parseUserErrMongoValidator(err);
                customRes = customResponse.setInfoCustomResponse(parseErrMongo, 'signUp', 3, false);
                return res.status(parseErrMongo.status).send(customRes);
            }
        }
    } else {
        //! errors detected by express-validator.
        customRes = customResponse.setCustomResponse(422, 'There are errors in the form', parseErrExp, 'signUp', 4, false);
        return res.status(422).send(customRes);
    }
};

/**
 * Allow a existing user to login.
 * * successful return a token.
 * ! error express-validator.
 * ! error not exist user.
 * ! error mongoose-validator.
 * @method signIn.
 * @param req: request send by the client with the email and password.
 * @param res: response send to client with the info of message and valid token.
 */
ctrl.signIn = async (req, res) => {
    let { email, password } = req.body;
    let user;
    let customRes;
    let isMatch, parseErrExp;

    parseErrExp = customError.parseUserErrExpValidator(req);
    //? check if exist errors express-validator.
    if(helpers.isEmptyJSON(parseErrExp)) {
        user = await User.findOne({ email }).select(['username', 'password']);
        //? check if exist the user.
        if(user) {
            isMatch = await user.matchPassword(password);
            //? check if the passwords match.
            if(isMatch) {
                //* successful login.
                customRes = customResponse.setCustomResponse(201, 'Successful Login. Redirecting ...',
                                {
                                    username: user.username,
                                    token: userService.createToken(user)
                                },
                                'signIn', 1, false
                            );
                return res.status(200).send(customRes);
            } else {
                //! error in the password.
                customRes = customResponse.setCustomResponse(400, 'Invalid password', {}, 'signIn', 2, false);
                return res.status(400).send(customRes);
            }
        } else {
            //! error not exist user.
            customRes = customResponse.setCustomResponse(400, 'Invalid email', {}, 'signIn', 3, false);
            return res.status(400).send(customRes);
        }
    } else {
        //! errors detected by express-validator.
        customRes = customResponse.setCustomResponse(422, 'There are errors in the form', parseErrExp, 'signIn', 4, false);
        return res.status(422).send(customRes);
    }
};

/**
 * Return the profile of an existing user.
 * * successful return user profile.
 * ! error not exist user.
 * 
 * @method profile.
 * @param req: request send by the client with a valid token.
 * @param res: response send to client with the info of message and user profile.
 */
ctrl.profile = async (req, res) => {
    let userID = req.user;
    let customRes;

    let user = await User.findById(userID).select(['username', 'email', 'firstName', 'lastName']);
    //? check if exist the user.
    if(user) {
        //* successful get profile.
        customRes = customResponse.setCustomResponse(200, '', user, 'profile', 1, false);
        return res.status(200).send(customRes);
    } else {
        //! error not exist user.
        customRes = customResponse.setNotUserFoundResponse('profile', 2, false);
        return res.status(404).send(customRes);
    }
};

/**
 * Edit the profile of an existing user.
 * * successful return user profile.
 * ! error express-validator.
 * ! error in the username or email.
 * ! error mongoose-validator.
 * 
 * @method editProfile.
 * @param req: request send by the client with a valid token, a username, a email, a firstName and lastName.
 * @param res: response send to client with the info of message and new user profile.
 */
ctrl.editProfile = async (req, res) => {
    let { username, email, firstName, lastName } = req.body;
    let userID, user;
    let data, customRes;
    let parseErrExp, parseErrMongo;
    
    parseErrExp = customError.parseUserErrExpValidator(req);
    //? check if exist errors express-validator.
    if(helpers.isEmptyJSON(parseErrExp)) {
        userID = req.user;
        user = await User.findById(userID).select(['username', 'email', 'firstName', 'lastName']);
        //? check if exist the user.
        if(user) {
            data = await customError.checkExistsUsernameAndEmail(user, username, email);
            //? check if the new username or new email already in use.
            if(helpers.isEmptyJSON(data)) {
                try {
                    //* successful edit profile.
                    user.firstName = firstName;
                    user.lastName = lastName;
                    user.username = username;
                    user.email = email;
                    await user.save();
                    // TODO: quitar el method and line con el show false;
                    customRes = customResponse.setCustomResponse(200, 'Successful edited user profile', user, 'editProfile', 1, false);
                    return res.status(200).send(customRes);
                } catch(err) {
                    //! errors detected by mongoose-validator.
                    parseErrMongo = customError.parseUserErrMongoValidator(err);
                    customRes = customResponse.setInfoCustomResponse(parseErrMongo, 'editProfile', 2, false);
                    return res.status(parseErrMongo.status).send(customRes);
                }
            } else {
                //! errors username or email already in use.
                customRes = customResponse.setCustomResponse(422, 'The username or the email is already in use', data, 'editProfile', 3, false);
                return res.status(422).send(customRes);
            }
        } else {
            //! error not exit user.
            customRes = customResponse.setNotUserFoundResponse('editProfile', 4, false);
            return res.status(404).send(customRes);
        }
    } else {
        //! errors detected by express-validator.
        customRes = customResponse.setCustomResponse(422, 'There are errors in the form', parseErrExp, 'editProfile', 5, false);
        return res.status(422).send(customRes);
    }
};

/**
 * Edit the password of an existing user.
 * * succesful save password edited.
 * ! error express-validator.
 * ! error not exit user.
 * ! error in the password.
 * ! error mongoose-validator.
 * 
 * @method editPassword.
 * @param req: request send by the client with a valid token, a current password, new password and password confirmed.
 * @param res: response send to client with the info of message.
 */
ctrl.editPassword = async (req, res) => {
    let { currentPassword, newPassword } = req.body;
    let userID, user;
    let customRes;
    let isMatch, parseErrExp, parseErrMongo;

    parseErrExp = customError.parseUserErrExpValidator(req);
    //? check if exist errors express-validator.
    if(helpers.isEmptyJSON(parseErrExp)) {
        userID = req.user;
        user = await User.findById(userID).select(['password']);
        //? check if exist the user.
        if(user) {
            isMatch = await user.matchPassword(currentPassword);
            //? check if the passwords match.
            if(isMatch) {
                try {
                    //* successful edit password.
                    user.password = await user.encryptPassword(newPassword);
                    await user.save();
                    customRes = customResponse.setCustomResponse(200, 'Successful edited user password', {}, 'editPassword', 1, false);
                    return res.status(200).send(customRes);
                } catch(err) {
                    //! errors detected by mongoose-validator.
                    parseErrMongo = customError.parseUserErrMongoValidator(err);
                    customRes = customResponse.setInfoCustomResponse(parseErrMongo, 'editPassword', 2, false);
                    return res.status(parseErrMongo.status).send(customRes);
                }
            } else {
                //! error in the password.
                customRes = customResponse.setCustomResponse(400, 'Invalid password', { currentPassword: 'Invalid password' }, 'editPassword', 3, false);
                return res.status(400).send(customRes);
            }
        } else {
            //! error not exit user.
            customRes = customResponse.setNotUserFoundResponse('editPassword', 4, false);
            return res.status(404).send(customRes);
        }
    } else {
        //! errors detected by express-validator.
        customRes = customResponse.setCustomResponse(422, 'There are errors in the form', parseErrExp, 'editPassword', 5, false);
        return res.status(422).send(customRes);
    }
};

/**
 * Return the removed user.
 * * successful remove user.
 * ! error not exist user.
 * 
 * @method removeUser.
 * @param req: request send by the client with a valid token.
 * @param res: response send to client with the info of message and removed user.
 */
ctrl.removeUser = async (req, res) => {
    let userID = req.user;
    let customRes;

    let user = await User.findById(userID);
    //? check if exist the user.
    if(user) {
        //* successful remove user.
        user.remove();
        customRes = customResponse.setCustomResponse(200, 'Account disabled', user, 'removeUser', 1, false);
        return res.status(200).send(customRes);
    } else {
        //! error not exist user.
        customRes = customResponse.setNotUserFoundResponse('removeUser', 2, false);
        return res.status(404).send(customRes);
    }
};

module.exports = ctrl;