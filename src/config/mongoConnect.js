const mongoose = require('mongoose');


let mongoSession;
const connect = async () => {
  await  mongoose.connect('mongodb://localhost:27017/graphql', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}
module.exports = { connect, mongoSession,mongoose };
