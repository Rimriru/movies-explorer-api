const { Joi, celebrate } = require('celebrate');
const linkRegularExpression = require('./regularExpressions.js');

const newMovieDataValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegularExpression),
    trailerLink: Joi.string().required().pattern(linkRegularExpression),
    thumbnail: Joi.string().required().pattern(linkRegularExpression),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = { newMovieDataValidation, movieIdValidation };
