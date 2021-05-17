const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
})

module.exports = mongoose.model('Post', PostSchema);