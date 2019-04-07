//===================================== IMPORTS =======================================//
// External Libs.
const express = require('express');
const router = express.Router();

// My Modules.
const { auth, expValValidators } = require('./middlewares');
const keys = require('../config/keys');
const { user } = require('./controllers');
//=====================================================================================//

//===================================== index.js ======================================//
// Configure my routes.
module.exports = app => {

    // Users routes.
    router.post(keys.routes.post.signUp, expValValidators.user.post.signup, user.signUp);
    router.post(keys.routes.post.signIn, expValValidators.user.post.signin, user.signIn);
    router.post(keys.routes.post.profile, auth.isAuth, user.profile);
    router.put(keys.routes.put.editProfile, auth.isAuth, expValValidators.user.put.profile, user.editProfile);
    router.put(keys.routes.put.editPassword, auth.isAuth, expValValidators.user.put.password, user.editPassword);
    router.delete(keys.routes.delete.removeUser, auth.isAuth, user.removeUser);

    app.use(router);

};