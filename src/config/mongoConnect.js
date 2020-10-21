const mongoose = require('mongoose');
const mongoConnect = require('connect-mongo');
const session = require('express-session');
const MongoStore = mongoConnect(session);


let mongoSession;
const connect = async () => {
  await  mongoose.connect('mongodb://localhost:27017/graphql', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // console.log(mongoSession);
}
module.exports = { connect, mongoSession,mongoose };
