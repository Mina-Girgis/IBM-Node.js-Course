const mongoose = require('mongoose');

exports.connectDB = () => {
	const dp = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
	mongoose.connect(dp, { useNewUrlParser: true }).then(() => {
		console.log('Database connection established');
	});
};
