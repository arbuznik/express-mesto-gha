const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {
  NotFoundError, handleErrors
} = require('./errors')

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => handleErrors(err, res))
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден')
      }

      res.send({ user })
    })
    .catch((err) => handleErrors(err, res))
}

module.exports.getMyself = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден')
      }

      res.send({ user })
    })
    .catch((err) => handleErrors(err, res))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({ user }))
    .catch((err) => {
      console.log(err)
      handleErrors(err, res)
    })
}
// TODO: JWT token send by http
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ user }))
    .catch((err) => handleErrors(err, res))
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ user }))
    .catch((err) => handleErrors(err, res))
}

module.exports.login = (req, res) => {
  const { email, password } = req.body
  console.log(email,password)
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user)
      const token = jwt.sign(
        { _id: user._id },
        'key',
        { expiresIn: '7d'},
        )
      res.send({token})
    })
    .catch(err => handleErrors(err, res))
}