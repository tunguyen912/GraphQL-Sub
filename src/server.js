const { ApolloServer, PubSub } = require('apollo-server-express');
const schema = require('./schema/schema')
const { createServer } = require('http')
const app = require('./app');
const pubsub = new PubSub();
const httpServer = createServer(app)
const mongoConnect = require('connect-mongo');
const session = require('express-session');


// const session = require('express-session');
// const mongoConnect = require('connect-mongo')

// const MongoStore = mongoConnect(session)

// let mongoSession;
// mongoose.connect('mongodb://localhost:27017/graphql', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     mongoSession = session({
//         secret: "MONGO_SESSION_SECRET",
//         resave: false,
//         saveUninitialized: true,
//         store: new MongoStore({ mongooseConnection: mongoose.connection })
//       })
// });
const { connect, mongoose} = require('./config/mongoConnect')

// const app = express();

connect();

const MongoStore = mongoConnect(session);
const connectSession = session({
    secret: "MONGO_SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
});
app.use(connectSession)

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, pubsub }),
    subscriptions: {
        onConnect: (connectionParams, webSocket, context) => {
            connectSession(webSocket.upgradeReq, {} , () => {
                //throw new Error('Error onConnect')
            })
            return context;
        }
    },
    playground: true,
    introspection: true,
});

server.installSubscriptionHandlers(httpServer)
server.applyMiddleware({ app })
httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000/${server.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:4000/${server.subscriptionsPath}`)
})

