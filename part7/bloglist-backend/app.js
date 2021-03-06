const express    = require('express')
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const cors       = require('cors')
const uri        = require('./utils/uri.js')
const config     = require('./utils/config')
const logger     = require('./utils/logger')
const middleware = require('./utils/middleware')


const app = express()

// Pre Middlewares
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.acquireAuthorizationToken)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'))
}

// Connection to the Database
logger.info('Connecting to:', config.MONGODB_URI)
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB.')
  })
  .catch((error) => {
    logger.error('ERROR connecting to MongoDB:', error.message)
  })

// Router Middleware
app.use(uri.API_LOGIN_URI, require('./controllers/login'))
app.use(uri.API_USERS_URI, require('./controllers/users'))
app.use(uri.API_BLOGS_URI, require('./controllers/blogs'))
app.use(uri.API_BLOGS_URI, require('./controllers/comments'))

// Testing Middleware
if (process.env.NODE_ENV === 'test') {
  app.use(uri.API_TESTING_URI, require('./controllers/testing'))
}

// Post Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app