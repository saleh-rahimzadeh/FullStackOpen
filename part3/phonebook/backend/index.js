const dotenv     = require('dotenv')
const express    = require('express')
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const cors       = require('cors')



/* Application
------------------------------------------------------------------------------- */

const app = express()

// Pre Middlewares
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
dotenv.config()

// Data Models
const Person = require('./models/Person')()

// Consts
const API_URL = '/api/persons'
const API_ID_URL = API_URL + '/:id'
const PORT = process.env.PORT

// Routes
app.get('/', pageHome)
app.get('/info', pageInfo)
app.get(API_URL, apiGetAll)
app.get(API_ID_URL, apiGet)
app.delete(API_ID_URL, apiDelete)
app.post(API_URL, apiAdd)

// Post Middlewares
app.use(unknownEndpoint)
app.use(errorHandler)

// Running application
app.listen(PORT, () => {
  console.log('Starting Application [', (new Date()).toLocaleTimeString(), ']')
  console.log(`URL: http://localhost:${PORT}${API_URL}`)
})



/* Middlewares
------------------------------------------------------------------------------- */

/**
 * Adding 'post-data' token to MORGAN
 */
morgan.token('post-data', function (request) { 
  return request.method === 'POST' ? JSON.stringify(request.body) : ' ' 
})

/**
 * Handling unknown endpoint
 */
function unknownEndpoint(request, response) {
  makeResponse(response, 404, 'send', 'unknown endpoint')
}

/**
 * Handling errors
 */
function errorHandler(error, request, response, next) {
  console.error("ERROR:", error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return makeResponse(response, 400, 'send', 'malformatted id')
  }

  next(error)
}



/* Utils
------------------------------------------------------------------------------- */

/**
 * Fetch ID from request's parameters
 */
const fetchID = (request) => {
  return request.params.id
}

/**
 * Making a response and send it
 */
const makeResponse = (response, errorCode, type, message) => {
  if (type === undefined) {
    return response.status(errorCode).end()
  }
  if (type === 'json') {
    return response.status(errorCode).json({ 
        error: message
    })
  }
  if (type === 'send') {
    return response.status(errorCode).send({ 
        error: message
    })
  }
}



/* Routes
------------------------------------------------------------------------------- */

/**
 * Home page
 */
function pageHome(request, response) {
  response.send('<h1>Welcome to Phonebook</h1>')
}

/**
 * Info page
 */
function pageInfo(request, response) {
  Person
    .find({})
    .then(people => {
      const info = `
        <p>Phonebook has info for ${people.length} people</p>
        <p>${(new Date()).toString()}</p>
      `
      response.send(info)
    })
}

/**
 * Get all persons
 */
function apiGetAll(request, response) {
  Person
    .find({})
    .then(people => {
      response.json(people.map(person => person.toJSON()))
    })
}

/**
 * Get a single person
 */
function apiGet(request, response, next) {
  Person
    .findById(fetchID(request))
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        makeResponse(response, 404)
      }
    })
    .catch(error => next(error))
}

/**
 * Delete a person
 */
function apiDelete(request, response, next) {
  Person
    .findByIdAndRemove(fetchID(request))
    .then(result => {
      if (result) {
        makeResponse(response, 204)
      } else {
        makeResponse(response, 404)
      }
    })
    .catch(error => next(error))
}

/**
 * Add a new person
 */
function apiAdd(request, response) {
  const body = request.body

  if (!body.name) {
    return makeResponse(response, 400, 'json', 'Name missing')
  }

  if (!body.number) {
    return makeResponse(response, 400, 'json', 'Number missing')
  }  

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(result => {
      response.json(person.toJSON())
    })
}
