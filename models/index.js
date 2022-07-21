const Blog = require("./blog");
const User = require("./user");

//one to many relationship between user and blog
User.hasMany(Blog);
Blog.belongsTo(User);

Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = {
	Blog,
	User,
};
