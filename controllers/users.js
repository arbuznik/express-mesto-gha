const User = require('../models/user')

const VALIDATION_ERROR_CODE = 400
const NOT_FOUND_ERROR_CODE = 404
const DEFAULT_ERROR_CODE = 500

const handleErrors = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь не найден' })
  }

  if (err.name === 'ValidationError') {
    return res.status(VALIDATION_ERROR_CODE).send({ message: err.message })
  }

  return res.status(DEFAULT_ERROR_CODE).send({ message: 'Ошибка получения пользователя' })
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => handleErrors(err, res))
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ user }))
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
