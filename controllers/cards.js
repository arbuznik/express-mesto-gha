const Card = require('../models/card')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({cards}))
    .catch(err => res.status(500).send({message: "Ошибка получения карточек"}))
}

module.exports.createCard = (req, res) => {
  const {name, link} = req.body

  Card.create({name, link, owner: req.user._id, createdAt: Date.now()})
    .then(card => res.send({card}))
    .catch(err => {
      console.log(err)
      res.status(500).send({message: "Ошибка создания карточки"})
    })
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(card => res.send({card}))
    .catch(err => res.status(500).send({message: "Ошибка удаления карточки"}))
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.send({card}))
    .catch(err => res.status(500).send({message: "Ошибка проставления лайка"}))
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({card}))
    .catch(err => res.status(500).send({message: "Ошибка удаления лайка"}))
}