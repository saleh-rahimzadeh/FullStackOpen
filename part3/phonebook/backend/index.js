const express = require('express')
const bodyParser = require('body-parser')



/* Application
------------------------------------------------------------------------------- */

const app = express()
app.use(bodyParser.json())
app.listen(3001, () => {
  console.log('Starting Application [', (new Date()).toLocaleTimeString(), ']')
  console.log(`http://localhost:3001${API_URL}`)
})



/* Data Definition
------------------------------------------------------------------------------- */

const API_URL = '/api/persons'
const API_ID_URL = API_URL + '/:id'

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



/* Routes
------------------------------------------------------------------------------- */

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Phonebook</h1>')
})

app.get('/info', (request, response) => {
  const info = `
    <p>Phonebook has info for ${people.length} people</p>
    <p>${(new Date()).toString()}</p>
  `
  response.send(info)
})

app.get(API_URL, (request, response) => {
  response.json(people)
})

app.get(API_ID_URL, (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
