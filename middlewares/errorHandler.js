const errorHandler = (err, req, res, next) => {
	console.error(err.message);

	if (err.name === "SequelizeValidationError") {
		return res.status(400).send({
			error: "Validation error",
			message: err.message,
		});
	} else {
		return res.status(400).send({
			message: err.message,
		});
	}
};

module.exports = errorHandler;
