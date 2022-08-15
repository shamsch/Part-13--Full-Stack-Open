const router = require("express").Router();

const { User, Blog } = require("../models/index");

router.get("/", async (req, res) => {
	const users = await User.findAll({
		include: [
			{
				model: Blog,
				attributes: ["title", "urlString"],
				as: "blogs",
			},
		],
	});
	res.json(users);
});

router.get("/:id", async (req, res) => {
	const user = await User.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Blog,
				as: "readinglist_user",
				through: {
					attributes: ["id", "read"]
				}
			},
		],
	});
	res.json(user);
});

router.post("/", async (req, res) => {
	const newUser = await User.create(req.body);
	res.json(newUser);
});

router.put("/:username", async (req, res) => {
	const user = await User.findOne({
		where: {
			username: req.params.username,
		},
	});

	if (!user) {
		res.status(404).send("User not found");
	} else {
		user.username = req.body.username;
		await user.save();
		res.json({ username: user.username });
	}
});

module.exports = router;
