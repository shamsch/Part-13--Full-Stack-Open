const errorHandler = (err, req, res, next) => {
	console.error(err.message);
	return res.status(400).send("Something broke!");
};

module.exports = errorHandler;
