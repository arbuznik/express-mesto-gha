const jwt = require('jsonwebtoken')
const { handleErrors, AuthRequiredError, AuthFailedError } = require("../controllers/errors");

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return handleErrors(new AuthRequiredError, res)
  }
  console.log('cookie', token)
  let payload;

  try {
    payload = jwt.verify(token, 'key')
  } catch(err) {
    return handleErrors(new AuthFailedError, res)
  }

  req.user = payload

  next()
}

// TODO: email viladator
// TODO: jwt secret key generation