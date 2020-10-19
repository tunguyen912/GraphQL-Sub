const { ApolloServer, PubSub } = require('apollo-server-express');
const resolvers = require('./schema/resolvers.js');
const typeDefs = require('./schema/schema.js');
const { createServer } = require('http')

const app = require('./app')
const pubsub = new PubSub();
const httpServer = createServer(app)


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, pubsub }),
    playground: true,
    introspection: true,
});
server.installSubscriptionHandlers(httpServer)
server.applyMiddleware({app})
httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000/${server.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:4000/${server.subscriptionsPath}`)
})