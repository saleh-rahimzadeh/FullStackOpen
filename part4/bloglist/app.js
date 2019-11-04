const express    = require('express')
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const cors       = require('cors')
const uri        = require('./utils/uri.js')
const config     = require('./utils/config')
const middleware = require('./utils/middleware')


const app = express()

// Pre Middlewares
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(middleware.requestLogger)

// Connection to the Database
console.log('Connecting to:', config.MONGODB_URI)
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB.')
  })
  .catch((error) => {
    console.log('ERROR connecting to MongoDB:', error.message)
  })

// Router Middleware
app.use(uri.API_URI, require('./controllers/blogs'))

// Post Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app