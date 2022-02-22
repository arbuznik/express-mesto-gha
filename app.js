const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/users')
const cards = require('./routes/cards')
const bodyParser = require('body-parser')

const {PORT = 3000} = process.env
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
  req.user = {
    _id: '62151558f3811ee0e2758856'
  }

  next()
})

app.use('/users', users)
app.use('/cards', cards)

app.listen(PORT, () => {
  console.log(`Server started at: ${PORT}`)
})

mongoose.connect('mongodb://localhost:27017/mestodb')