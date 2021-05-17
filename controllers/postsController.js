const Post = require('../models/post');
const PostsRepository = require('../repository/postsRepository');
const postsRepo = new PostsRepository();
module.exports = {
    getPosts: (req, res) => {
        let posts = postsRepo.getAll();
        console.log(posts);
        res.json(posts);
    },
    getPostById: (req, res) => {
        let post = postsRepo.getById(req.params.postId);
        res.send(post);
    }
};