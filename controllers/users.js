const User = require('../models/user')

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({users}))
    .catch(err => res.status(500).send({message: "Ошибка получения пользователей"}))
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({user}))
    .catch(err => res.status(500).send({message: "Ошибка получения пользователя"}))
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body

  User.create({name, about, avatar})
    .then(user => res.send({user}))
    .catch(err => res.status(500).send({message: "Ошибка создания пользователя"}))
}

module.exports.updateProfile = (req, res) => {
  const {name, about} = req.body

  User.findByIdAndUpdate(req.user._id,
    {name, about},
    {new: true, runValidators: true})
    .then(user => res.send({user}))
    .catch(err => res.status(500).send({message: "Ошибка обновления пользователя"}))
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body

  User.findByIdAndUpdate(req.user._id,
    {avatar},
    {new: true, runValidators: true})
    .then(user => res.send({user}))
    .catch(err => res.status(500).send({message: "Ошибка обновления пользователя"}))
}