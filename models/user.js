const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const { AuthFailedError } = require('../middlewares/errors/AuthFailedError')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9]+\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)/.test(avatar),
      message: 'bad avatar url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'bad email',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
})

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthFailedError('Wrong email or password'))
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthFailedError('Wrong email or password'))
          }

          return user
        })
    })
}

module.exports = mongoose.model('user', userSchema)
