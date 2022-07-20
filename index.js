require("dotenv").config();
const { Sequelize, QueryTypes, Model } = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: Sequelize.STRING,
        },
        urlString: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    },
    { sequelize, underscored: true, timestamps: false, modelName: "blog" }
);

// creates the table if it doesn't exist already
Blog.sync();

app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/blogs", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (err) {
        console.log(err);
    }
});

app.delete("/api/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });
        if(!blog){
            res.status(404).send("Blog not found");
        }
        else{
            res.json("blog deleted");
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting blog");
    }
}
);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
