const NOT_VALID = 400;
const UNAUTHORIZED_CODE = 401;
const NO_RIGHTS_CODE = 403;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;

const notValidErrorMessage = `Код ${NOT_VALID}: введены некорректные данные`;
const unauthorizedErrorMessage = `Код ${UNAUTHORIZED_CODE}: не удалось авторизоваться`;
const noRightsErrorMessage = `Код ${NO_RIGHTS_CODE}: недостаточно прав для действия`;
const notFoundErrorMessage = `Код ${NOT_FOUND}: объект по данному идентификатору не найден`;
const conflictErrorMessage = `Код ${CONFLICT_ERROR}: пользователь с таким email уже зарегистрирован`;

module.exports = {
  unauthorizedErrorMessage,
  noRightsErrorMessage,
  notValidErrorMessage,
  notFoundErrorMessage,
  conflictErrorMessage,
};
