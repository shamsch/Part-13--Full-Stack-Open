const router = require("express").Router();
const Blog = require("../models/blog");
const { sequelize } = require("../util/db");

router.get("/", async (req, res, next) => {
	const authors = await Blog.findAll({
		group: ["author"],
		attributes: [
			"author",
			[sequelize.fn("COUNT", "author"), "blogs"], // count the number of blogs per author
			[sequelize.fn("SUM", sequelize.col("likes")), "likes"], // sum the number of likes among all blogs per author
		],
		order: [[sequelize.fn("max", sequelize.col("likes")), "DESC"]], // order by the most likes
	});
	res.json(authors);
});

module.exports = router;
