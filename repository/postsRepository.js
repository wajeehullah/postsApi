const fs = require('fs');

class PostsRepository {
    constructor() {
        this.posts = [];
        this.loadData();
    }

    loadData() {
        try {
            const postsJson = fs.readFileSync(process.cwd() + '/data/posts.json');
            this.posts = JSON.parse(postsJson);
        } catch (ex) {
            console.log("error loading data for posts", ex);
        }
    }

    getById(id) {
        let post = {};
        this.posts.forEach(p => {
            if (p.id == id) {
                post = p;
            }
        })
        return post;
    }

    getAll() {
        return this.posts;
    }
}

module.exports = PostsRepository;