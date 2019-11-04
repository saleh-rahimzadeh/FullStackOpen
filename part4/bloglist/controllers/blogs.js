const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')


// Get all blogs
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

// Save new blog
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedBlog => {
      response.status(201).json(savedAndFormattedBlog)
    })
    .catch(error => next(error))
})


module.exports = blogsRouter