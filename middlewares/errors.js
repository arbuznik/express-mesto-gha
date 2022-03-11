module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

module.exports.AuthRequiredError = class AuthRequiredError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthRequiredError'
    this.statusCode = 403
  }
}

module.exports.AuthFailedError = class AuthFailedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthFailedError'
    this.statusCode = 401
  }
}

module.exports.handleErrors = (err, req, res, next) => {
  console.log('handleerror:', err)
  if (err.name === 'CastError') {
    return res.status(400).send({ message: err.message })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message })
  }

  if (err.name === "MongoError" && err.code === 11000) {
    return res.status(409).send({ message: `Email already registered` })
  }

  const errStatusCode = err.statusCode || 500

  return res.status(errStatusCode).send({ message: err.message })
}