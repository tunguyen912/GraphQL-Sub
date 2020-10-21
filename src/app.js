const express = require('express')
const session = require('express-session');
const mongoConnect = require('connect-mongo');
require('dotenv').config()
// const { connect, mongoose} = require('./config/mongoConnect')

const app = express();

// connect();
// const MongoStore = mongoConnect(session);
// const sessionOptions = {
//     secret: '123',
//     cookie: {
//       maxAge: 60000
//     },
//     saveUninitialized: true,
//     resave:true
// };
// app.use(session({
//   secret: "MONGO_SESSION_SECRET",
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }))
module.exports = app