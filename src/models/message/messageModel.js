const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    messageFrom: {
        type: String,
        required: true
    },
    messageTo: {
        type: String,
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
const MessageModel = mongoose.model('messages', messageSchema);
module.exports = { MessageModel }
