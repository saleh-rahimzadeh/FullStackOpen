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

// URI Consts
const PAGE_URI = '/'
const PAGE_INFO_URI = PAGE_URI + 'info'
const API_URI = '/api/persons'
const API_ID_URI = API_URI + '/:id'

// Page Routes
app.get(PAGE_URI, pageHome)
app.get(PAGE_INFO_URI, pageInfo)

// API Routes
app.get(API_URI, apiGetAll)
app.get(API_ID_URI, apiGet)
app.delete(API_ID_URI, apiDelete)
app.post(API_URI, apiAdd)
app.put(API_ID_URI, apiUpdat)

// Post Middlewares
app.use(unknownEndpoint)
app.use(errorHandler)

// Running application
app.listen(process.env.PORT, () => {
  console.log('Starting Application [', (new Date()).toLocaleTimeString(), ']')
  console.log(`URL: http://localhost:${process.env.PORT}${API_URI}`)
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
  console.error('ERROR:', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return makeResponse(response, 400, 'send', 'malformatted id')
  } else if (error.name === 'ValidationError') {
    return makeResponse(response, 400, 'json', error.message)
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





/* Page Routes
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
  Person.countDocuments({}, function(err, count) {
    const info = `
      <p>Phonebook has info for ${count} people.</p>
      <p>${(new Date()).toString()}</p>
    `
    response.send(info)
  })
}



/* API Routes
------------------------------------------------------------------------------- */

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
function apiAdd(request, response, next) {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(newPerson => newPerson.toJSON())
    .then(newAndFormattedPerson => {
      response.json(newAndFormattedPerson)
    })
    .catch(error => next(error))
}

/**
 * Update a person
 */
function apiUpdat(request, response, next) {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(fetchID(request), person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
}
