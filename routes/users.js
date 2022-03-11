const users = require('express').Router()
const {
  getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users')
const { celebrate, Joi } = require("celebrate");

users.get('/', getUsers)

users.get('/:id', getUser)

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
}), updateProfile)

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  })
}), updateAvatar)

module.exports = users

