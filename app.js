const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);

app.all('*', (req, res, next) => {
	next(new AppError('Cant find this route on server', res.statusCode));
});
app.use(errorController.globalErrorController);
module.exports = app;
