const UserRepository = require('../repository/userRepository');
const userRepo = new UserRepository();
module.exports = {
    getUsers: async (req, res) => {
        console.log(req.user);
        let users = await userRepo.getAllUsers();
        console.log(users);
        res.json(users);
    },
    getUserById: async (req, res) => {
        console.log("received request with param", req.params.userId);
        let user = await userRepo.getById(req.params.userId);
        console.log(user);
        res.json(user);
    },
    saveUser: (req, res) => {
        console.log(req.body);
        
        res.send("ok");
    }
};