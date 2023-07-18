const express = require('express');

const bookRoute = express.Router();
const bookController = require('./../controllers/bookController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRoute = require('./reviewRoutes');
bookRoute.route('/').get(bookController.getAllBooks);

bookRoute.route('/add').post(authController.protect, authController.restrictTo('admin'), bookController.addBook);

// for reviews
bookRoute.use('/:id/review', reviewRoute);

module.exports = bookRoute;
