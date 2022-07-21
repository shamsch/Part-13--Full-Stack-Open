const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		req.decodedToken = jwt.verify(authorization.substring(7), "topsecret");
	} else {
		req.decodedToken = null;
	}
	next();
};

module.exports = tokenExtractor;
