const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError.js');
const { incorrectTokenErrorMessage, notFoundTokenErrorMessage } = require('../errors/errorMessages.js');

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnauthorizedError(notFoundTokenErrorMessage));
  } else {
    try {
      const payload = jwt.verify(req.cookies.jwt, `${process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-for-developement'}`);
      req.user = payload;
      next();
    } catch (err) {
      next(new UnauthorizedError(incorrectTokenErrorMessage));
    }
  }
};

module.exports = auth;
