// External Libs.
const express = require('express');

// My Modules.
const { app } = require('./config');
require('./db');

// Load server configuration.
const server = app(express());

// Start the server.
server.listen(server.get('port'), () => {
    console.log(`Server running on port ${server.get('port')}`);
});