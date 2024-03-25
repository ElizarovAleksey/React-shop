// routes.js
const express = require('express');
const router = express.Router();

const authController = require('./authController');
const registrationController = require('./registrationController');
const userController = require('./userController');


router.post('/api/login', authController.login);
router.post('/api/registration', registrationController.register);
router.post('/api/change-password/:id', userController.changePassword);
router.post('/api/change-email/:id', userController.changeEmail);


module.exports = router;