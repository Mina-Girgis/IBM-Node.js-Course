const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		auther: {
			type: String,
			required: true,
		},
		avaliable: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
