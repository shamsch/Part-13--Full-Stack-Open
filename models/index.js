const Blog = require("./blog");
const User = require("./user");

//one to many relationship between user and blog
//it creates a new column in the blog table called userId despite there is no userId column in the blog table according to the schema/model
//now we can use the userId column in the blog table to find the user that created the blog
//by default the userId refers to the id of the user that created the blog and it is a foreign key in the blog table
//and one user can have many blogs, thus the name one to many
//note user table can now also be populated with data from the blog table

User.hasMany(Blog);
Blog.belongsTo(User);

// commented out because of migration will be used to create the user table in the database from now on
// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
	Blog,
	User,
};
