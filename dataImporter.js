const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const appContants = require('./constants/appConstants');
// npm install --save mongoose
mongoose.connect(appContants.mongodb.connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("unable to connect to database", err);
})

const users = JSON.parse(fs.readFileSync(process.cwd()
    + '/data/users.json', 'utf-8'));
const posts = JSON.parse(fs.readFileSync(process.cwd() + '/data/posts.json'));
const ImportData = async () => {
    try {
        await User.create(users);
        console.log("after create")
        let usersResult = await User.find();
        console.log("users", usersResult);
        await Post.create(posts);
        let postsResult = await Post.find();
        console.log('posts', postsResult);
    } catch (ex) {
        console.log(ex);
    }
}
const deleteData = async () => {
    try {
        await User.deleteMany();
        console.log("after delete");
        let usersResult = await User.find();
        console.log(usersResult);
        await Post.deleteMany();
        let postsResult = await Post.find();
        console.log("posts", postsResult);
    } catch (ex) {
        console.log("error deleting documents", ex);
    }
}

if (process.argv[2] === '-i') {
    ImportData();
} else if (process.argv[2] === '-d') {
    deleteData();
}