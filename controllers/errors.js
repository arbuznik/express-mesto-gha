const VALIDATION_ERROR_CODE = 400
const AUTH_ATTEMPT_ERROR_CODE = 401
const AUTH_REQUIRED_ERROR_CODE = 403
const NOT_FOUND_ERROR_CODE = 404
const DEFAULT_ERROR_CODE = 500

module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

module.exports.AuthRequiredError = class AuthRequiredError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthRequiredError'
  }
}

module.exports.AuthFailedError = class AuthFailedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthFailedError'
  }
}

module.exports.handleErrors = (err, res) => {
  console.log(err.name)
  if (err.name === 'CastError') {
    return res.status(VALIDATION_ERROR_CODE).send({ message: err.message })
  }

  if (err.name === 'ValidationError') {
    return res.status(VALIDATION_ERROR_CODE).send({ message: `Некорректные данные: ${err.message}` })
  }

  if (err.name === 'NotFoundError') {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message })
  }

  if (err.name === 'AuthRequiredError') {
    return res.status(AUTH_REQUIRED_ERROR_CODE).send({ message: 'Auth required' })
  }

  if (err.name === 'AuthFailedError') {
    return res.status(AUTH_ATTEMPT_ERROR_CODE).send({ message: 'Auth failed' })
  }

  return res.status(DEFAULT_ERROR_CODE).send({ message: err.message })
}