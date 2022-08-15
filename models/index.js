const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readinglist");

//one to many relationship between user and blog
//it creates a new column in the blog table called userId despite there is no userId column in the blog table according to the schema/model
//now we can use the userId column in the blog table to find the user that created the blog
//by default the userId refers to the id of the user that created the blog and it is a foreign key in the blog table
//and one user can have many blogs, thus the name one to many
//note user table can now also be populated with data from the blog table

User.hasMany(Blog, {
	as: "blogs",
});
Blog.belongsTo(User);


// many to many relationship between user and blog through connection table readinglist 
// it creates a new table called readinglist that has two columns blogId and userId
// now we can use the blogId and userId columns in the readinglist table to find the user and blog that is connected
// the idea is user can have many blogs in the readinglist table and blog can have many users in the readinglist table

User.belongsToMany(Blog, { through: ReadingList, as: "readinglist_user" });
Blog.belongsToMany(User, { through: ReadingList});

// commented out because of migration will be used to create the user table in the database from now on
// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
	Blog,
	User,
	ReadingList,
};
