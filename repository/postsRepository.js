const fs = require('fs');
const Post = require('../models/post');
const GenericResponse = require('../utils/GenericResponse');
class PostsRepository {
    constructor() {
    }

    async getById(id) {
        let post = await Post.findById(id);
        return post;
    }

    async getAll() {
        let posts = await Post.find();
        return posts;
    }

    async createPost(post) {
        let response = {
            success: false,
            error: {}
        };
        try {
            let newPost = new Post({
                title: post.title,
                body: post.body
            });
    
            await newPost.save();
            response.success = true;
        } catch (ex) {
            response.success = false;
            response.error = ex;
        }

        return response;
    }

    async updatePost(postId, postData) {
        let response = new GenericResponse();
        try {
            // check if post already exists
            const post = await Post.findById(postId);

            // update post
            if (post) {
                await Post.findByIdAndUpdate(postId, {
                    title: postData.title, body: postData.body
                },
                    { new: true });
                response.success = true;
            } else {
                response.error = "Post not found..."
            }
        } catch (ex) {
            console.log(ex);
            response.error = ex;
        }
        return response;
    }

    async deletePost(postId) {
        let response = new GenericResponse();
        try {
            const post = await Post.findById(postId);
            if (post) {
                await post.remove();
                response.success = true;
            }
        } catch (ex) {
            response.error = ex;
        }
        return response;
    }
}

module.exports = PostsRepository;