module.exports.handleErrors = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: err.message })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message })
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).send({ message: 'Email already registered' })
  }

  const errStatusCode = err.statusCode || 500

  return res.status(errStatusCode).send({ message: err.message })
}
