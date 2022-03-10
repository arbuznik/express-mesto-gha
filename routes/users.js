const users = require('express').Router()
const {
  getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users')

users.get('/', getUsers)

users.get('/:id', getUser)

users.patch('/me', updateProfile)

users.patch('/me/avatar', updateAvatar)

module.exports = users
