const express = require('express');
const { getUserInfo, updateUserInfo } = require('../controllers/user.js');
const { existingUserDataValidation } = require('../utils/userDataValidationRules.js');

const router = express.Router();

router.get('/me', getUserInfo);
router.patch('/me', existingUserDataValidation, updateUserInfo);

module.exports = router;
