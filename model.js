const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
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
})
const User = mongoose.model('users', userSchema);
const Message = mongoose.model('messages', messageSchema);
module.exports = { User, Message }