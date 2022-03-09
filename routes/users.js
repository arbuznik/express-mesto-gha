const users = require('express').Router()
const {
  getUsers, getUser, updateProfile, updateAvatar, getMyself,
} = require('../controllers/users')

users.get('/', getUsers)

users.get('/:id', getUser)

users.get('/me', getMyself)

users.patch('/me', updateProfile)

users.patch('/me/avatar', updateAvatar)

module.exports = users
