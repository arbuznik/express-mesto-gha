const users = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users')

users.get('/', getUsers)

users.get('/me', getCurrentUser)

users.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUser)

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile)

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(
      /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9]+\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/,
    ),
  }),
}), updateAvatar)

module.exports = users
