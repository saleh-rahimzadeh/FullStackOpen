const commentsRouter = require('express').Router()
const Comment        = require('../models/comment')
const Blog           = require('../models/blog')
const uri            = require('../utils/uri.js')


// Save new user
commentsRouter.post(uri.API_COMMENTS_URI, async (request, response, next) => {
  try {
  	const body = request.body

  	const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    const comment = new Comment({
    	text: body.text,
    	blog: blog._id
    })

    const savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
  } catch (exception) {
    next(exception)
  }
})


module.exports = commentsRouter