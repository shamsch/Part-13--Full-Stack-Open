const { Session } = require("../models/index");

const processSession = async (req, res, next) => {
	const token = req.get("Authorization").substring(7);
	const session = await Session.findOne({
		where: {
			session: token,
		},
	});

	if (!session) {
		res.status(401).send("Invalid token");
	} else if (session.valid === false) {
		res.status(401).send("Session expired");
	} else {
		req.session = session;
		next();
	}
};

module.exports = processSession;
