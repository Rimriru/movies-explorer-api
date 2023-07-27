const mongoose = require('mongoose');
const Movie = require('../models/movie.js');
const NotFoundError = require('../errors/NotFoundError.js');
const NoRightsError = require('../errors/NoRightsError.js');
const { noRightsErrorMessage, notFoundErrorMessage, notValidErrorMessage } = require('../errors/errorMessages.js');
const ValidationError = require('../errors/ValidationError.js');

const getCurrentUserFilms = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((movieList) => res.send(movieList))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieParams = req.body;
  Movie.create({
    owner,
    ...movieParams,
  })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((foundMovie) => {
      if (foundMovie.owner.valueOf() === req.user._id) {
        Movie.deleteOne({ _id: id })
          .then(() => res.send({ message: 'Фильм удален из сохраненных' }))
          .catch(next);
      } else {
        next(new NoRightsError(noRightsErrorMessage));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUserFilms, createMovie, deleteMovie };
