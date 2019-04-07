// External Libs.
const cors = require('cors');
const express = require('express');
const path = require('path');

// My Modules.
const keys = require('./keys');
// My Routes.
const routes = require('../routes');

// Configure the server.
module.exports = app => {

    // Settings.
    app.set('port', process.env.PORT || keys.server.port);

    // Middlewares.
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    // Routes.
    routes(app);

    // Static files.
    app.use(express.static(path.join(__dirname + '/../..', '/client/dist/client')));

    return app;
    
};