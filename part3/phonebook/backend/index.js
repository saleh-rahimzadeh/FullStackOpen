const dotenv     = require('dotenv')
const express    = require('express')
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const cors       = require('cors')



/* Application
------------------------------------------------------------------------------- */

const app = express()

// Pre Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(express.static('build'))
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

// Running application
app.listen(PORT, () => {
  console.log('Starting Application [', (new Date()).toLocaleTimeString(), ']')
  console.log(`URL: http://localhost:${PORT}${API_URL}`)
})



/* Middlewares
------------------------------------------------------------------------------- */

morgan.token('post-data', function (request) { 
  return request.method === 'POST' ? JSON.stringify(request.body) : ' ' 
})

function unknownEndpoint(request, response) {
  response.status(404).send({ error: 'unknown endpoint' })
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
 * Creeating an error response and send it
 */
const createErrorResponse = (response, message) => {
  return response.status(400).json({ 
      error: message
  })
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
function apiGet(request, response) {
  const id = fetchID(request)
  Person.findById(id).then(person => {
    response.json(person.toJSON())
  })
}

/**
 * Delete a person
 */
function apiDelete(request, response) {
  // TODO: implement
  response.status(204).end()
}

/**
 * Add a new person
 */
function apiAdd(request, response) {
  const body = request.body

  if (!body.name) {
    return createErrorResponse(response, 'Name missing')
  }

  if (!body.number) {
    return createErrorResponse(response, 'Number missing')
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
