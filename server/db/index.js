// External Libs.
const mongoose = require('mongoose');

// My Keys.
const { keys } = require('../config');

// Connect with the database.
mongoose.connect(keys.db.uri, {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));