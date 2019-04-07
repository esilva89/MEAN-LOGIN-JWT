// External Libs.
const bcrypt = require('bcryptjs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const { model, Schema } = require('mongoose');

// My Keys.
const keys = require('../../config/keys');

// Define my user model.
const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: 'Username is already in use',
        minlength: [5, 'Username must be at least 5 characters'],
        select: false
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: 'Email is already in use',
        match: [keys.db.regex.matchEmail, 'Email must be a valid email address'],
        lowercase: true,
        select: false
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    avatar: { type: String, default: 'avatarDefault', select: false },
    firstName: { type: String, select: false },
    lastName: { type: String, select: false },
    date: {
        type: Date,
        default: Date.now,
        select: false
    }
});

// Load the plugin in the user model.
UserSchema.plugin(beautifyUnique);

/**
 * Encrypt a password.
 * 
 * @method encryptPassword.
 * @param password: a string the characters.
 * @return hash: a encrypted password.
 * @throws err: error if the password do not match with the regex.
 */
UserSchema.methods.encryptPassword = async (password) => {
    let regexPassword = new RegExp(keys.db.regex.matchPassword);
    
    if(regexPassword.test(password)) {
        //* encrypt password.
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } else {
        //! error in the password.
        let err = new Error();
        err.errors = {
            password: {
                message: 'Password must contains at least one uppercase, one lowercase, one number and one special character'
            }
        };
        throw err;
    }
};

/**
 * Decrypt a password and compare it with the password stored in the database.
 * 
 * @method matchPassword.
 * @param password: a encrypted password.
 * @return true if the passwords match; false otherwise.
 */
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);