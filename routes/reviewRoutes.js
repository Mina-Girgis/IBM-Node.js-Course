const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const reviewRoute = express.Router({ mergeParams: true });

//   /book/:id/review/
reviewRoute
	.route('/')
	.get(reviewController.getAllReviews)
	.post(authController.protect, reviewController.addReview)
	.put(authController.protect, reviewController.updateReview)
	.delete(authController.protect, reviewController.deleteReview);

module.exports = reviewRoute;
