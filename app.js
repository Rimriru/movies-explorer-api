require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/rateLimiter.js');
const { errorLogger, requestLogger } = require('./middlewares/logger.js');
const routes = require('./routes/index.js');
const { createUser, login, logout } = require('./controllers/user.js');
const { newUserDataValidation, userCredentialsValidation } = require('./utils/userDataValidationRules.js');
const errorHandler = require('./errors/errorHandler.js');
const auth = require('./middlewares/auth.js');

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log(`Подключён к базе данных по адресу ${MONGODB_URL}`);
  });

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

// роуты идентификации, аутентификации и авторизации
app.post('/signup', newUserDataValidation, createUser);
app.post('/signin', userCredentialsValidation, login);
app.get('/signout', logout);
app.use(auth);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
