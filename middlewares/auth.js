const jwt = require('jsonwebtoken')
const {AuthRequiredError, AuthFailedError } = require("./errors");

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    next(new AuthRequiredError('Auth required'))
  }

  let payload;

  try {
    payload = jwt.verify(token, 'key')
  } catch(err) {
    next(new AuthFailedError('Auth failed'))
  }

  req.user = payload

  next()
}