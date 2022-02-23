const users = require('express').Router()
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users')

users.post('/', createUser)

users.get('/', getUsers)

users.get('/:id', getUser)

users.patch('/me', updateProfile)

users.patch('/me/avatar', updateAvatar)

module.exports = users
