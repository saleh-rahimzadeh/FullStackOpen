const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')
const uri         = require('../utils/uri.js')


// Get all blogs
blogsRouter.get(uri.HOME_URI, async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

// Save new blog
blogsRouter.post(uri.HOME_URI, async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    ...body,
    likes: body.likes === undefined ? 0 : body.likes
  })

  try {
    const savedNote = await blog.save()
    response.status(201).json(savedNote.toJSON())
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter