const { User } = require("../models");

const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post("/", async (req, res) => {
	const username = req.body.username;
	const user = await User.findOne({
		where: {
			username: username,
		},
	});
	if (user) {
		const token = jwt.sign(
			{
				username: user.username,
				id: user.id,
				name: user.name,
			},
			"topsecret"
		);

		res.json({
			token: token,
		});
	} else {
		res.status(401).json({
			error: "username not found",
		});
	}
});

module.exports = router;
