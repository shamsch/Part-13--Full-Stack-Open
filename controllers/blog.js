const router = require("express").Router();

const { Blog, User } = require("../models/index");

router.get("/", async (req, res, next) => {
	const blogs = await Blog.findAll({
		attributes: { exclude: ["userId"] },
		include: [
			{
				model: User,
				attributes: ["name"],
			},
		],
	});
	res.json(blogs);
	// throw new Error("Not implemented");
});

router.post("/", async (req, res, next) => {
	if (!req.decodedToken) {
		throw new Error("You must be logged in to view this page");
	}
	const { title, author, urlString } = req.body;
	const userId = req.decodedToken.id;
	const blog = await Blog.create({ title, author, urlString, userId });
	res.json(blog);
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
		await blog.save();
		res.json({ likes: blog.likes });
	}
});

module.exports = router;
