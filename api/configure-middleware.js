const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStorage = require('connect-session-knex')(session);

const knexConnection = require('../data/dbConfig');



const sessionConfiguration = {
  name: 'elephant',
  secret: process.env.COOKIE_SECRET || 'is it secret? is it safe?',
  cookie: {
    maxAge: 100 * 60 * 60,
    secure: process.env.NODE_ENV || 'development' ? false : true, 
    httpOnly: true
  },
  resave: false,
  saveUnitialized: true,
  store: new KnexSessionStorage ({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10,
    tablename: 'user_sessions',
    sidfieldname: 'id',
    createtable: true
  })
}

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfiguration))
};
