const express = require("express");
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
require("express-async-errors"); // this middleware will handle all errors and next(err) will get called, thus making try{}catch() block useless
const blogsRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const authorRouter = require("./controllers/author");
const errorHandler = require("./middlewares/errorHandler");
const tokenExtractor = require("./middlewares/tokenExtractor");

app.use(express.json());

app.use("/api/blogs", tokenExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);

app.use(errorHandler);

const start = async () => {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();
