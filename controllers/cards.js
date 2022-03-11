const Card = require('../models/card')
const { NotFoundError } = require('../middlewares/errors/NotFoundError')
const { AuthRequiredError } = require('../middlewares/errors/AuthRequiredError')

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next)
}

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body

  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => res.send({ card }))
    .catch(next)
}

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена')
      }

      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndDelete(req.params.cardId)
          .then((cardItem) => {
            res.send({ cardItem })
          })
      } else {
        throw new AuthRequiredError('Forbidden: not an owner')
      }
    })
    .catch(next)
}

module.exports.likeCard = (req, res, next) => {
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
    .catch(next)
}

module.exports.dislikeCard = (req, res, next) => {
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
    .catch(next)
}
