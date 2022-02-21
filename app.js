const express = require('express')
const mongoose = require('mongoose')

const {PORT = 3000} = process.env

const app = express()

app.listen(PORT, () => {
  console.log('yeahooo')
})

mongoose.connect('mongodb://localhost:27017/mestodb')