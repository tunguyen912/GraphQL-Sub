const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: String, 
        ref: 'users'
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Number,
        default: 0
    },
    listOfLike: [String]
});

const PostModel = mongoose.model('posts', postSchema);
module.exports = { PostModel }