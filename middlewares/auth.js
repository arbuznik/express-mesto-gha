const jwt = require('jsonwebtoken')
const { handleErrors, AuthRequiredError, AuthFailedError } = require("../controllers/errors");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleErrors(new AuthRequiredError, res)
  }

  const token = authorization.replace('Bearer: ', '')
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