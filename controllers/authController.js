const CatchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const generateToken = (id) => {
	return jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: '10d',
	});
};

const createSendToken = (user, status, res) => {
	const token = generateToken(user._id);

	let cookieOptions = {
		expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		cookieOptions.secure = true;
	}
	// set token in cookies
	res.cookie('token', token, cookieOptions);
	user.password = undefined;
	res.status(status).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

//token
exports.signUp = CatchAsync(async (req, res, next) => {
	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	createSendToken(user, 201, res);
});

//token
exports.login = CatchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new AppError('Incorrect email or password', 401));
	}
	const isMatch = await user.matchPassword(password, user.password);
	if (isMatch) {
		createSendToken(user, 200, res);
	} else {
		return next(new AppError('Incorrect email or password', 401));
	}
});

exports.protect = CatchAsync(async (req, res, next) => {
	//** MAKE SURE THAT USER LOGGED IN **//
	// 1) get the token
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	if (!token) {
		return next(new AppError('You are not logged in', 401));
	}

	//verification token
	// get decoded ddata (uid) from this function
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// check is user exists
	const uid = decoded.id;
	const user = await User.findById(uid);
	if (!user) {
		return next(new AppError('user does not exists, logged in again', 401));
	}

	req.user = user;
	next();
});

exports.restrictTo = (...roles) => {
	// roles is an array of strings
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You do not have permission to perform this action', 403));
		}
		next();
	};
};
