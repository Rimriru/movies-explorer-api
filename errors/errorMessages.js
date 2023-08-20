const NOT_VALID = 400;
const NO_RIGHTS_CODE = 403;
const NOT_FOUND = 404;

const notValidErrorMessage = `Код ${NOT_VALID}: введены некорректные данные`;
const incorrectTokenErrorMessage = 'При авторизации произошла ошибка. Переданный токен некорректен.';
const notFoundTokenErrorMessage = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
const userRegisterErrorMessage = 'При регистрации пользователя произошла ошибка.';
const unauthorizedErrorMessage = 'Вы ввели неправильный логин или пароль.';
const noRightsErrorMessage = `Код ${NO_RIGHTS_CODE}: недостаточно прав для действия`;
const conflictErrorMessage = 'Пользователь с таким email уже существует.';
const notFoundErrorMessage = `Код ${NOT_FOUND}: объект по данному идентификатору не найден`;

module.exports = {
  incorrectTokenErrorMessage,
  userRegisterErrorMessage,
  notFoundTokenErrorMessage,
  unauthorizedErrorMessage,
  noRightsErrorMessage,
  notValidErrorMessage,
  notFoundErrorMessage,
  conflictErrorMessage,
};
