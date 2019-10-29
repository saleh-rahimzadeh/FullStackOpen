const mongoose      = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')



mongoose.set('useFindAndModify', false)


function Connect() {
	const url = process.env.MONGODB_URI


	// Connection to the Database
	console.log('Connecting to:', url)

	mongoose
		.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	  .then(result => {
	    console.log('Connected to MongoDB.')
	  })
	  .catch((error) => {
	    console.log('ERROR connecting to MongoDB:', error.message)
	  })


	// Create Schema & Model
	const personSchema = new mongoose.Schema({
	  name: { type: String, required: true, unique: true },
	  number: { type: String, required: true, unique: true },
	})

	personSchema.plugin(uniqueValidator)

	personSchema.set('toJSON', {
	  transform: (document, returnedObject) => {
	    returnedObject.id = returnedObject._id.toString()
	    delete returnedObject._id
	    delete returnedObject.__v
	  }
	})


	// Return Person Model
	return mongoose.model('Person', personSchema)
}



module.exports = Connect