module.exports.VALIDATION_ERROR_CODE = 400
module.exports.NOT_FOUND_ERROR_CODE = 404
module.exports.DEFAULT_ERROR_CODE = 500

module.exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}
