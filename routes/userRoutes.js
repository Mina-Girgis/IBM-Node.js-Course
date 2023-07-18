const express = require('express');
const authController = require('./../controllers/authController');
const userRoute = express.Router();

userRoute.route('/').post(authController.signUp);

userRoute.route('/login').post(authController.login);

module.exports = userRoute;
