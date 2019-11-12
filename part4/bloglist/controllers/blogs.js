const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')
const uri         = require('../utils/uri.js')
const User        = require('../models/user')


// Get all blogs
blogsRouter.get(uri.HOME_URI, async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

// Save new blog
blogsRouter.post(uri.HOME_URI, async (request, response, next) => {
  const body = request.body

  // const user = await User.findById(body.userId)
  const user = await User.findOne({})

  const blog = new Blog({
    ...body,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  try {
    const savedNote = await blog.save()

    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()

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

// Update a blog
blogsRouter.put(uri.API_ID_URI, async (request, response, next) => {
  const body = request.body

  if (body.likes === undefined) {
    return response.status(400).json({ error: 'likes missing' })
  }

  const blog = {
    title  : body.title,
    author : body.author,
    url    : body.url,
    likes  : body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
      response.status(201).json(updatedBlog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter