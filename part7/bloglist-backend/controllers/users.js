const bcrypt      = require('bcryptjs')
const usersRouter = require('express').Router()
const User        = require('../models/user')
const uri         = require('../utils/uri.js')


// Get all users
usersRouter.get(uri.HOME_URI, async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

// Save new user
usersRouter.post(uri.HOME_URI, async (request, response, next) => {
  try {
    const body = request.body

    if (body.password === undefined || body.password === '') {
      return response.status(400).json({ error: 'Password missing' })
    }
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'Password is shorter than the minimum allowed length (3).' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username : body.username,
      name     : body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})


module.exports = usersRouter