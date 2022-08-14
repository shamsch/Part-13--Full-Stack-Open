const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog, User } = require("../models/index");

router.get("/", async (req, res, next) => {
	let where = {};
	if (req.query.search) {
		where = {
			[Op.or]: [
				{ title: { [Op.iLike]: `%${req.query.search}%` } },
				{ author: { [Op.iLike]: `%${req.query.search}%` } },
			],
		};
	}

	const blogs = await Blog.findAll({
		attributes: { exclude: ["userId"] },
		include: [
			{
				model: User,
				attributes: ["name"],
			},
		],
		where,
		order: [["likes", "DESC"]],
	});
	res.json(blogs);
	// throw new Error("Not implemented");
});

router.post("/", async (req, res, next) => {
	if (!req.decodedToken) {
		throw new Error("You must be logged in to view this page");
	}
	const { title, author, urlString, year } = req.body;
	const userId = req.decodedToken.id;
	if (year >= 1991 && year <= new Date().getFullYear()) {
		const blog = await Blog.create({
			title,
			author,
			urlString,
			userId,
			year,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		res.json(blog);
	} else {
		res.status(400).json({
			error: "Year must be between 1991 and current year",
		});
	}
});

router.delete("/:id", async (req, res, next) => {
	if (!req.decodedToken) {
		throw new Error("You must be logged in to delete a blog");
	}
	const blog = await Blog.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!blog) {
		throw new Error("Blog not found");
	}
	if (blog.userId !== req.decodedToken.id) {
		throw new Error("You can only delete your own blogs");
	}
	await blog.destroy();
	res.json({ message: "Blog deleted" });
});

router.put("/:id", async (req, res, next) => {
	const blog = await Blog.findByPk(req.params.id);
	if (!blog) {
		res.status(404).send("Blog not found");
	} else {
		blog.likes = blog.likes + 1;
		blog.updatedAt = new Date();
		await blog.save();
		res.json({ likes: blog.likes });
	}
});

module.exports = router;
