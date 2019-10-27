const express    = require('express')
const bodyParser = require('body-parser')
const morgan     = require('morgan')
const cors       = require('cors')



/* Application
------------------------------------------------------------------------------- */

const app = express()

// Consts
const API_URL = '/api/persons'
const API_ID_URL = API_URL + '/:id'
const PORT = process.env.PORT || 3001

// Pre Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
app.use(express.static('build'))

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



/* Data Definition
------------------------------------------------------------------------------- */

let people = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]



/* Utils
------------------------------------------------------------------------------- */

/**
 * Fetch ID from request's parameters
 */
const fetchID = (request) => {
  return Number(request.params.id)
}

/**
 * Generate a random ID
 */
const generateID = () => {
  return Math.floor(Math.random() * 999);
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
  const info = `
    <p>Phonebook has info for ${people.length} people</p>
    <p>${(new Date()).toString()}</p>
  `
  response.send(info)
}

/**
 * Get all persons
 */
function apiGetAll(request, response) {
  response.json(people)
}

/**
 * Get a single person
 */
function apiGet(request, response) {
  const id = fetchID(request)
  const person = people.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
}

/**
 * Delete a person
 */
function apiDelete(request, response) {
  const id = fetchID(request)
  people = people.filter(person => person.id !== id)

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

  if (people.find(person => person.name === body.name)) {
    return createErrorResponse(response, 'Name must be unique')
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  people = people.concat(person)

  response.json(person)
}
