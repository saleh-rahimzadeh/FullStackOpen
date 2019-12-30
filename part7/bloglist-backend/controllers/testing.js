const testingRouter = require('express').Router()
const Blog          = require('../models/blog')
const User          = require('../models/user')
const uri           = require('../utils/uri.js')


testingRouter.post(uri.API_RESET_URI, async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})


module.exports = testingRouter