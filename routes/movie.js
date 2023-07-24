const express = require('express');
const { getCurrentUserFilms, createMovie, deleteMovie } = require('../controllers/movie.js');
const { newMovieDataValidation, movieIdValidation } = require('../utils/movieDataValidationRules.js');

const router = express.Router();

router.get('/', getCurrentUserFilms);
router.post('/', newMovieDataValidation, createMovie);
router.delete('/:id', movieIdValidation, deleteMovie);

module.exports = router;
