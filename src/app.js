const express = require('express')
const session = require('express-session');
require('dotenv').config()

const app = express();

const sessionOptions = {
    secret: '123',
    cookie: {
      maxAge: 60000
    },
    saveUninitialized: true,
    resave:true
};

app.use(session(sessionOptions));

module.exports = app