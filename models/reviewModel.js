const mongoose = require('mongoose');

const reviewModel = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'user id is required'],
		},
		content: {
			type: String,
			trim: true,
			required: [true, 'content is required'],
		},
		book: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
			required: [true, 'book id is required'],
		},
	},
	{ timestamps: true }
);

reviewModel.pre(/^find/, function (next) {
	this.populate('user', 'name email').populate('book', 'name code auther');
	next();
});
const Review = mongoose.model('Review', reviewModel);
module.exports = Review;
