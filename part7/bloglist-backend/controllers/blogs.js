const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')
const uri         = require('../utils/uri.js')
const jwt         = require('jsonwebtoken')
const User        = require('../models/user')


// Get all blogs
blogsRouter.get(uri.HOME_URI, async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { text: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

// Save new blog
blogsRouter.post(uri.HOME_URI, async (request, response, next) => {
  const body = request.body

  try {
    const token = request.authorizationToken
    const userToken = jwt.verify(token, process.env.PASSWORD_SECRET)
    if (!token || !userToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(userToken.id)

    const blog = new Blog({
      ...body,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    const targetBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

    user.blogs = user.blogs.concat(targetBlog._id)
    await user.save()

    response.status(201).json(targetBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

// Delete a blog
blogsRouter.delete(uri.API_ID_URI, async (request, response, next) => {
  try {
    const token = request.authorizationToken
    const userToken = jwt.verify(token, process.env.PASSWORD_SECRET)
    if (!token || !userToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    if (blog.user.toString() !== userToken.id) {
      return response.status(401).json({ error: 'unauthorized delete blog' })
    }

    const result = await blog.remove()
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
    title    : body.title,
    author   : body.author,
    url      : body.url,
    likes    : body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('comments', { id: 1, text: 1 })
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