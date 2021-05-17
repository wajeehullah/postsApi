const ErrorResponse = require('../utils/errorResponse');
const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const userRepo = new UserRepository();
const authConstants = require('../constants/authConstants');
module.exports = {
    login: async (req, res, next) => {
        console.log("received login request")
        // { 'email': 'test@test.com', 'password': '123456' }
        // receive email and password in req.body
        // npm i --save jsonwebtoken
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorResponse("Email and Password are required.", 400));
        }

        // get user by email
        let user = await userRepo.getUserByEmail(email);
        console.log(user);
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // match password
        if (!user.matchPassword(password)) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // generate auth token
        let token = jwt.sign({ email: user.email }, authConstants.jwtKey, {
            expiresIn: '1h'
        });

        //reply back with token
        res.json({
            sucess: true,
            token
        })
    }
};