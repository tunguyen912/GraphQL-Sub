const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-express');

const { userSchema, userResolvers } = require('./users/userSchema')
const { messageSchema, messageResolvers } = require('./message/messageSchema')

const Query = gql`
    type Query {
        _empty: String
    }
`
const Mutation = gql`
    type Mutation {
        _empty: String
    }
`
const Subscription = gql`
    type Subscription{
        _empty: String
    }
`

const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Mutation,
    Subscription,
    userSchema,
    messageSchema
  ],
  resolvers: [
    userResolvers,
    messageResolvers
  ]
})

module.exports = schema