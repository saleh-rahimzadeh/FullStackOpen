const mongoose = require('mongoose')

// Check arguments
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('USAGE')
  console.log('')
  console.log('Display list of Persons:')
  console.log('$ node mongo <password>')
  console.log('')
  console.log('Add a new Person:')
  console.log('$ node mongo <password> <person_name> <person_number>')
  process.exit(1)
}





/* Database
------------------------------------------------------------------------------- */

// Make Connection
const dbname = 'phonebook'
const password = process.argv[2]

mongoose.connect(
  `mongodb+srv://user-fullstack:${password}@cluster0-jhnjl.azure.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)



// Check Connectivity
var db = mongoose.connection

db.on('error', function() {
  console.log('Error in connection.')
  process.exit(1)
})

db.once('open', function() {
})



// Create Schema & Model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)





/* Data
------------------------------------------------------------------------------- */

// Add new person
if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person
    .save()
    .then(result => {
      console.log('Added', 'Name:', result.name, 'Number:', result.number, 'to phonebook')
      mongoose.connection.close()
    })
}



// Display all of the persons
if (process.argv.length === 3) {
  Person
    .find({})
    .then(people => {
      console.log('phonebook:')
      people.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}
