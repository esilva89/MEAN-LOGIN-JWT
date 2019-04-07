// My Modules.
const { userService } = require('../../services');
const { customResponse } = require('../../utils');

// Define the methods of my authentication middleware.
const auth = {};

/**
 * Check if a existing user is authorized for accessed a determined function.
 * * successful decode a token.
 * ! error in the header.
 * ! error in the token.
 * 
 * @method isAuth.
 * @param req: request sent to by client with a header of authorization.
 * @param res: response sent to client.
 * @param next: next middleware.
 */
auth.isAuth = (req, res, next) => {
    let token;
    let customRes;

	if(!req.headers.authorization) {
        //! error in the header.
        customRes = customResponse.setCustomResponse(403, 'You have not authorization', {}, 'isAuth', 1, false);
        return res.status(403).send(customRes);
    }
    // get token of the header.
	token = req.headers.authorization.split(" ")[1];	
	userService.decodeToken(token)
        .then(response => {
            //* send the user id.
            req.user = response;
            next();
        })
        .catch(err => {
            //! error in the token.
            customRes = customResponse.setCustomResponse(err.status, err.msg, {}, err.method, err.nroLine, err.show);
            return res.status(err.status).send(customRes);
        });
};

module.exports = auth;