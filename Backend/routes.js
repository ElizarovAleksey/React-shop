// routes.js
const express = require('express');
const router = express.Router();

const authController = require('./authController');
const registrationController = require('./registrationController');
const userController = require('./userController');


router.post('/login', authController.login);
router.post('/registration', registrationController.register);
router.post('/change-password/:id', userController.changePassword);
router.post('/change-email/:id', userController.changeEmail);


module.exports = router;