const errorHandler = (err, req, res, next) => {
	console.error(err.message);

	if (err.name === "SequelizeValidationError") {
		return res.status(400).send({
			message: err.message,
		});
	}

	next(err);
};

module.exports = errorHandler;
