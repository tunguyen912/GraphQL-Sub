const { MessageModel } = require('../../models/message/messageModel')
const { defaultResponse } = require('../../utils/utils');
const { ERROR } = require('../../utils/constant/errorConstant')

const createMessage = async (messageData, req) => {
    let { toUser, messageContent } = messageData;
    let { userName } = req.session.user;
    let newMessageData = new MessageModel({
        messageFrom: userName,
        messageTo: toUser,
        message: messageContent
    })
    let result = await newMessageData.save();
    if (result) return defaultResponse( true, result.message )
    throw new Error(ERROR);
}
module.exports = { createMessage }