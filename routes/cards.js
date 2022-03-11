const cards = require('express').Router()
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards')
const { celebrate, Joi } = require("celebrate");

cards.get('/', getCards)

cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().email().required(),
  })
}), createCard)

cards.delete('/:cardId', deleteCard)

cards.put('/:cardId/likes', likeCard)

cards.delete('/:cardId/likes', dislikeCard)

module.exports = cards
