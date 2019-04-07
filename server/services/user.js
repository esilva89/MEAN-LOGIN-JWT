// External Libs.
const jwt = require('jwt-simple');
const moment = require('moment');

// My Keys.
const keys = require('../config/keys');

// Define the methods of my user service.
const userService = {};

/**
 * Create a token using the user id.
 * 
 * @method createToken.
 * @param user: mongoose user model.
 * @return a encoded token.
 */
userService.createToken = (user) => {
	const payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(2, 'hours').unix()
	};
	return jwt.encode(payload, keys.services.user.token);
};

/**
 * decodeToken
 * * succesful return decode token.
 * ! error token been expired.
 * ! error ivalid token.
 * 
 * @param token: a encode token.
 * @return the decoded token.
 * @throws error if exist an error at the moment of decoding the token.
 */
userService.decodeToken = (token) => {
	const decoded = new Promise((resolve, reject) => {
		try {
			if(token == "null") {
				//! error token null.
				reject({
					status: 422,
					msg: 'The token is null',
					method: 'decodeToken',
					nroLine: 1,
					show: false
				});
			}
			const payload = jwt.decode(token, keys.services.user.token, true);
			//? check if the token expired.
			if(payload.exp <= moment().unix()) {
				//! error in the decode token.
				reject({
					status: 401,
					msg: 'The token have been expired',
					method: 'decodeToken',
					nroLine: 2,
					show: false
				});
			}
			resolve(payload.sub);
		} catch(err) {
			//! error in the decode token.
			reject({
				status: 500,
				msg: 'Invalid token',
				method: 'decodeToken',
				nroLine: 3,
				show: false
			});
		}
	});
	return decoded;
};

module.exports = userService;