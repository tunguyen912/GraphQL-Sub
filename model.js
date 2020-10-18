const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const messageSchema = mongoose.Schema({
    messageFrom: {
        type: userSchema,
        required: true
    },
    messageTo: {
        type: userSchema,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})
const UserModel = mongoose.model('users', userSchema);
const MessageModel = mongoose.model('messages', messageSchema);
module.exports = { UserModel, MessageModel }