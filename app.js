const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/users')
const cards = require('./routes/cards')

const { PORT = 3000 } = process.env
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '62151558f3811ee0e2758856',
  }

  next()
})

app.use('/users', users)
app.use('/cards', cards)

app.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }))

app.listen(PORT)

mongoose.connect('mongodb://localhost:27017/mestodb')
