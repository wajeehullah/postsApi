const Post = require('../models/post');
const PostsRepository = require('../repository/postsRepository');
const postsRepo = new PostsRepository();
const ErrorResponse = require('../utils/errorResponse');
module.exports = {
    getPosts: async (req, res) => {
        let posts = await postsRepo.getAll();
        console.log(posts);
        res.json(posts);
    },
    getPostById: async (req, res) => {
        let post = await postsRepo.getById(req.params.postId);
        res.json(post);
    },
    createPost: async (req, res, next) => {
        let { title, body } = req.body;
        let response = await postsRepo.createPost({ title, body });
        res.json(response);
    },
    deletePost: async (req, res, next) => {
        // get post id from req.params
        const postId = req.params.postId;
        let response = await postsRepo.deletePost(postId);
        res.json(response);
    },
    updatePost: async (req, res) => {
        const { title, body } = req.body;
        const postId = req.params.postId;
        let response = await postsRepo.updatePost(postId,
            {
                title, body
            });
        res.json(response);
    }
};