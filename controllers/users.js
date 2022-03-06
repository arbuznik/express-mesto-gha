const User = require('../models/user')
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => handleErrors(err, res))
}

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
