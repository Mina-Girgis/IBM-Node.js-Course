const CatchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const Book = require('./../models/bookModel');
const Review = require('./../models/reviewModel');
const AppError = require('../utils/appError');
const sendResponse = require('../utils/sendResponse');

exports.getAllReviews = CatchAsync(async (req, res, next) => {
	const { id } = req.params;

	const reviews = await Review.find({ book: id }).sort({ createdAt: -1 });
	sendResponse(res, 201, 'success', { data: reviews });
});

exports.addReview = CatchAsync(async (req, res, next) => {
	const { id } = req.params; // book id
	const uid = req.user._id;
	const { content } = req.body;

	const review = await Review.create({ user: uid, content: content, book: id });
	sendResponse(res, 201, 'success', { data: review });
});

exports.updateReview = CatchAsync(async (req, res, next) => {
	const { content, reviewId } = req.body;
	const review = await Review.findByIdAndUpdate(reviewId, { content }, { new: true });
	sendResponse(res, 203, 'success', { data: review });
});

exports.deleteReview = CatchAsync(async (req, res, next) => {
	const { reviewId } = req.body;
	const review = await Review.findByIdAndDelete(reviewId);
	sendResponse(res, 203, 'success', { data: null });
});
