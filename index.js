const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
require("express-async-errors"); // this middleware will handle all errors and next(err) will get called, thus making try{}catch() block useless
const blogsRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

const start = async () => {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();
