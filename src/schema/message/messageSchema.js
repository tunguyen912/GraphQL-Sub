const { createMessage } = require('../../controllers/message/messageController')
const { gql } = require('apollo-server');
const { NEW_MESSAGE_ADDED } = require('../../utils/constant/messageConstant')
const { PubSub, withFilter } = require('apollo-server');

const typeDefs = gql`
  
  extend type Mutation {
    createMessage(messageData: messageData): MessageResponse
  }
  extend type Subscription {
    createMessage(toUser: String!): Message!
  }

  #Data Type
  type MessageResponse{
    isSuccess: Boolean!
    message: String
  }
  type Message {
    messageFrom: String!
    messageTo: String!
    message: String!
  }

  #Input Data
  input messageData {
    toUser: String!
    messageContent: String!
  }
`;

const pubsub = new PubSub()
const resolvers = {
    Mutation: {
        createMessage: async (obj, {messageData}, {req} ) => {
            // console.log(req.headers)
            let result = await createMessage(messageData, req)
            const payload = {
                createMessage: {
                    messageFrom: req.session.user.userName,
                    messageTo: messageData.toUser,
                    message: result.message
                }
            }
            pubsub.publish(NEW_MESSAGE_ADDED, payload);
            return result
        }
        
    },
    Subscription: {
        createMessage: {
            subscribe: withFilter(
                () => {
                    return pubsub.asyncIterator(NEW_MESSAGE_ADDED)
                },
                (payload, variables, context, info) => {
                    console.log(context)
                    return payload.createMessage.messageTo === variables.toUser
                }
            ) 
        }
    },
};
module.exports = { 
    messageSchema: typeDefs, 
    messageResolvers: resolvers 
  }