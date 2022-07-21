const router = require("express").Router();

const { Blog } = require("../models/blog");

router.get("/", async (req, res) => {
	try {
		const blogs = await Blog.findAll();
		res.json(blogs);
	} catch (err) {
		console.log(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const blog = await Blog.create(req.body);
		res.json(blog);
	} catch (err) {
		console.log(err);
	}
});

router.delete("/:id", async (req, res) => {
	try {
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
	} catch (err) {
		console.log(err);
		res.status(500).send("Error deleting blog");
	}
});

module.exports = router;
