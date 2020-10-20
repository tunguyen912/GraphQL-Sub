const { ApolloServer, PubSub } = require('apollo-server-express');
const schema = require('./schema/schema')
const { createServer } = require('http')
const mongoose = require('mongoose');
const app = require('./app');
const pubsub = new PubSub();
const httpServer = createServer(app)

mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;
const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, pubsub }),
    // subscriptions: {
    //     onConnect: (connectionParams, webSocket, context) => {
    //         // console.log(context.request)
    //     }
    // },
    playground: true,
    introspection: true,
});
server.installSubscriptionHandlers(httpServer)
server.applyMiddleware({ app })
httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000/${server.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:4000/${server.subscriptionsPath}`)
})