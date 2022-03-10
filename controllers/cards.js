const Card = require('../models/card')

const {
  NotFoundError, handleErrors, NotAnOwnerError,
} = require('./errors')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => handleErrors(err, res))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body

  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => res.send({ card }))
    .catch((err) => handleErrors(err, res))
}

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена')
      }

      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndDelete(req.params.cardId)
          .then((card) => {
            res.send({ card })
          })
      } else {
        throw new NotAnOwnerError()
      }
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
