const { createMessage, getMessageController } = require('../../controllers/message/messageController')
const { gql, withFilter, PubSub } = require('apollo-server');
const { NEW_MESSAGE_ADDED } = require('../../utils/constant/messageConstant')
const authorizationMiddleware = require('../../middlewares/authorizationMiddleware');

const typeDefs = gql`
  extend type Query {
    getMessageHistory: [Message]
  }
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
    Query: {
      getMessageHistory: async (_, __, context) => {
        let result = await authorizationMiddleware(context, getMessageController)
        return result
      },
    },
    Mutation: {
        createMessage: async (obj, {messageData}, {req} ) => {
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
                () => pubsub.asyncIterator(NEW_MESSAGE_ADDED),
                (payload, variables) => {
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