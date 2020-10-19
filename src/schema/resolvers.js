// const { UserModel } = require('../models/user/userModel');
// const { MessageModel } = require('../models/message/messageModel')
const mongoose = require('mongoose');
const { signIn, signUp, signOut } = require('../controllers/user/userControllers');
const { createMessage } = require('../controllers/message/messageController')
const { PubSub, withFilter } = require('apollo-server');
const { NEW_MESSAGE_ADDED } = require('../utils/constant/messageConstant')

mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const pubsub = new PubSub()

const resolvers = {
    Query: {
        hello: (parent, { userName }) => {
            return `Hello ${userName}`;
        }
    },
    Mutation: {
        signIn: async (obj, { signInData }, { req }) => {
            return await signIn(signInData, req);
        },
        signUp: async (obj, { signUpData }) => {
            return await signUp(signUpData);
        },
        signOut: async (obj, args, { req }) => {
            return await signOut(req);
        },
        createMessage: async (obj, {messageData}, {req} ) => {
            let result = await createMessage(messageData, req)
            const payload = {
                createMessage: {
                    toUser: messageData.toUser,
                    messageContent: result.message
                }
            }
            pubsub.publish(NEW_MESSAGE_ADDED, payload);
            return result
        }
    },
    Subscription: {
        createMessage: {
            subscribe: withFilter(
                (_, __, { pubsub }) => pubsub.asyncIterator(NEW_MESSAGE_ADDED),
                (payload, variables) => {
                    return payload.toUser === variables.toUser
                    // return true
                }
            )
        }
    },
};

module.exports = resolvers;