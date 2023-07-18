const CatchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const Book = require('./../models/bookModel');
const Review = require('./../models/reviewModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const sendResponse = require('../utils/sendResponse');

exports.getAllBooks = CatchAsync(async (req, res, next) => {
	const features = new APIFeatures(Book.find({ avaliable: true }), req.query).filter();
	const books = await features.query;
	sendResponse(res, 200, 'success', { data: books });
});

exports.addBook = CatchAsync(async (req, res, next) => {
	const { name, code, auther } = req.body;
	const book = await Book.create({ name, code, auther });
	sendResponse(res, 201, 'success', { data: book });
});
