
const { ApolloServer, PubSub } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, pubsub })
});

server.listen({ port: 4000 })
    .then(({ url }) => console.log(`Server running at ${url}`))