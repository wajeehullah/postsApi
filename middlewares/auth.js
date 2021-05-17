const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const authConstants = require('../constants/authConstants');
const UserRepository = require('../repository/userRepository');
const userRepo = new UserRepository();
module.exports = {
    authenticate: async (req, res, next) => {
        let token;
        // check if header has a token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // extract token from header
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return next(new ErrorResponse("Unauthorized request", 401));
        }

        // verify token
        try {
            const decode = jwt.verify(token, authConstants.jwtKey);
            // get user by email
            req.user = await userRepo.getUserByEmail(decode.email);
        } catch (ex) {
            console.log(ex);
            return next(new ErrorResponse("Unauthorized request", 401));
        }
        
        // call next
        next();
    },
    authorize: (...roles) => { 
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new ErrorResponse('Not authorized for this route', 403));
            }

            next();
        }
    }
};