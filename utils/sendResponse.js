module.exports = (res, statusCode, status, data) => {
	return res.status(statusCode).json({
		status: status,
		data: data,
	});
};
