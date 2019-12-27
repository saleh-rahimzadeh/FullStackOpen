const mongoose = require('mongoose')


// Create Schema & Model
const commentSchema = mongoose.Schema({
  text  : { type: String, required: true },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


// Return Model
module.exports = mongoose.model('Comment', commentSchema)