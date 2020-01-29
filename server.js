const express = require('express')
const session = require('express-session')
const server = express()
const KnexSessionStore = require('connect-session-knex')(session)
const db = require('./data/dbConfig')

const sessionConfig = {
    secret: process.env.SESSION_SECRET 
    || 'test secret',
    name: '',
    cookie:  {
      maxAge:1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex:db,
        tablename: 'sessions',
      sidfieldname: 'sid', 
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
}


server.use(express.json())
server.use(session(sessionConfig))
const authRoutes = require('./auth/auth-router')
server.use('/api', authRoutes)

module.exports= server; 