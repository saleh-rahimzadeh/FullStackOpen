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

// Delete a blog
blogsRouter.delete(uri.API_ID_URI, async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndRemove(request.params.id)
    if (result) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter