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
  }
  type Subscription {
    newMessage: Message!
    newUser: User!
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