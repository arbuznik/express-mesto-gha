const Card = require('../models/card')
const {
  VALIDATION_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  NotFoundError,
} = require('./errors')

const handleErrors = (err, res) => {
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

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => handleErrors(err, res))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body

  Card.create({
    name, link, owner: req.user._id, createdAt: Date.now(),
  })
    .then((card) => res.send({ card }))
    .catch((err) => handleErrors(err, res))
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена')
      }

      res.send({ card })
    })
    .catch((err) => handleErrors(err, res))
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена')
      }

      res.send({ card })
    })
    .catch((err) => handleErrors(err, res))
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена')
      }

      res.send({ card })
    })
    .catch((err) => handleErrors(err, res))
}
