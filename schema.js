const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getUser(userName: String!): User!
    Users: [User]!
    hello(userName: String!): String!
  }
  type Mutation {
    addUser(userName: String!, email: String!): User!
    updateEmail(email: String!): User!
    deleteUser(userName: String!): String!
    addMessage(from: String!, to: String!, message: String!): Message!
    
    signIn(signInData: signInData): SignInResponse
    signUp(signUpData: signUpData): DefaultResponse
    signOut: DefaultResponse
  }
  type Subscription {
    newMessage: Message!
    newUser: User!
  }
  input signInData {
    userName: String!
    password: String!
  }
  input signUpData {
    email: String!
    password: String!
    userName: String!
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
    messageFrom: User!
    messageTo: User!
    message: String!
  }
`;
module.exports = typeDefs