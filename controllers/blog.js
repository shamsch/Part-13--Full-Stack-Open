const router = require("express").Router();

const { Blog } = require("../models/index");

router.get("/", async (req, res, next) => {
	const blogs = await Blog.findAll({});
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
	const blog = await Blog.destroy({
		where: {
			id: req.params.id,
		},
	});
	if (!blog) {
		res.status(404).send("Blog not found");
	} else {
		res.json("blog deleted");
	}
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
