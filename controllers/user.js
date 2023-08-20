const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/NotFoundError.js');
const ValidationError = require('../errors/ValidationError.js');
const ConflictError = require('../errors/ConflictError.js');
const UnauthorizedError = require('../errors/UnauthorizedError.js');
const {
  userRegisterErrorMessage,
  notFoundErrorMessage,
  notValidErrorMessage,
  conflictErrorMessage,
  unauthorizedErrorMessage,
} = require('../errors/errorMessages.js');

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email,
      name,
      password: hash,
    })
      .then((newUser) => {
        res.status(201).send({
          email: newUser.email,
          name: newUser.name,
        });
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new ValidationError(userRegisterErrorMessage));
        } else if (err.code === 11000) {
          next(new ConflictError(conflictErrorMessage));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(unauthorizedErrorMessage))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              { _id: user._id },
              `${process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret-for-developement'}`,
              { expiresIn: '7d' },
            );
            res.cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: true,
            });
            res.status(200).send({ message: 'Вы успешно залогинились!' });
          } else {
            next(new UnauthorizedError(unauthorizedErrorMessage));
          }
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы успешно вышли из профиля!' });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    userId,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(notValidErrorMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(conflictErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  logout,
  getUserInfo,
  updateUserInfo,
};
