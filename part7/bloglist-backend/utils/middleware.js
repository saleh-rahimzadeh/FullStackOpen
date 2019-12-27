const logger = require('./logger')


// Logging requests
const requestLogger = (request, response, next) => {
  logger.info('---')
  logger.info('Method:', request.method)
  logger.info('Body:  ', request.body)
  next()
}

// Response for Unknown Endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Handling unhandled errors
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)

  next(error)
}

// Acquire token from authorization header
const acquireAuthorizationToken = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.authorizationToken = authorization.substring(7)
  } else {
    request.authorizationToken = null
  }

  next()
}



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  acquireAuthorizationToken
}