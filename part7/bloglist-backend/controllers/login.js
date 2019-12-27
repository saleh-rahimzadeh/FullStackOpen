const loginRouter = require('express').Router()
const jwt         = require('jsonwebtoken')
const bcrypt      = require('bcryptjs')
const uri         = require('../utils/uri.js')
const User        = require('../models/user')


// Login
loginRouter.post(uri.HOME_URI, async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userToken, process.env.PASSWORD_SECRET)

  response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name
    })
})


module.exports = loginRouter