const express = require('express')

const server = express()
const authRoutes = require('./auth/auth-router')
server.use(express.json())



module.exports= server; 