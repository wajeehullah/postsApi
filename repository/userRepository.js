const User = require('../models/user');
class UserRepository {
    constructor() {

    }

    async getById(id) {
        let user;
        try {
            user = await User.findById(id);
        } catch (ex) {
            console.log("users-getById", ex);
        }

        return user;
    }

    async getAllUsers() {
        let users = await User.find();
        return users;
    }

    async getUserByEmail(email) {
        let user = await User.findOne({ email: email });
        return user;
    }

    async saveUser(user) {
        try {
            let newUser = new User({
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            });
    
            await newUser.save();
            console.log("user saved...");
        } catch (ex) {
            console.log(ex)
        }
    }
}

module.exports = UserRepository;