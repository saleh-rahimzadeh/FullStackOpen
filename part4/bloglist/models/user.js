const mongoose        = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


// Create Schema & Model
const userSchema = mongoose.Schema({
  username     : { type: String, required: true, unique: true, minlength: 3 },
  name         : String,
  passwordHash : { type: String, required: true }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})


// Return Model
module.exports = mongoose.model('User', userSchema)