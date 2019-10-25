const express = require('express')
const bodyParser = require('body-parser')



/* Application
------------------------------------------------------------------------------- */

const app = express()
app.use(bodyParser.json())
app.listen(3001, () => {
  console.log('Starting Application [', (new Date()).toLocaleTimeString(), ']')
  console.log(`http://localhost:3001${BASEURL}`)
})



/* Data Definition
------------------------------------------------------------------------------- */

const BASEURL = '/api/persons'

let persons = [
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

app.get(BASEURL, (request, response) => {
  response.json(persons)
})
