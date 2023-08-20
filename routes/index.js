const router = require('express').Router();
const userRoutes = require('./user.js');
const movieRoutes = require('./movie.js');
const NotFoundError = require('../errors/NotFoundError.js');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена.'));
});

module.exports = router;
