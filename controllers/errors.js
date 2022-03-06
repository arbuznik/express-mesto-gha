const VALIDATION_ERROR_CODE = 400
const NOT_FOUND_ERROR_CODE = 404
const DEFAULT_ERROR_CODE = 500

module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

module.exports.handleErrors = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(VALIDATION_ERROR_CODE).send({ message: err.message })
  }

  if (err.name === 'ValidationError') {
    return res.status(VALIDATION_ERROR_CODE).send({ message: `Некорректные данные: ${err.message}` })
  }

  if (err.name === 'NotFoundError') {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message })
  }

  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка получения карточки' })
}