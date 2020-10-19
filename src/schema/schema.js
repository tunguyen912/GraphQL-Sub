const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello(userName: String!): String!
  }
  type Mutation {
    signIn(signInData: signInData): SignInResponse
    signUp(signUpData: signUpData): DefaultResponse
    signOut: DefaultResponse
    createMessage(messageData: messageData): DefaultResponse
  }
  type Subscription {
    createMessage(toUser: String!): Message!
  }

  #Data Type
  type ChatMessage {
    from: String!
    to: String!
    messageContent: String
    time: String!
  }
  type SignInResponse{
    isSuccess: Boolean!
    message: String
    jwt: String
  }
  type DefaultResponse{
    isSuccess: Boolean!
    message: String
  }
  type User {
    userName: String!
    email: String!
  }
  type Message {
    messageFrom: String!
    messageTo: String!
    message: String!
  }
  
  #Input Data
  input signInData {
    userName: String!
    password: String!
  }
  input signUpData {
    email: String!
    password: String!
    userName: String!
  }
  input messageData {
    toUser: String!
    messageContent: String!
  }
`;
module.exports = typeDefs