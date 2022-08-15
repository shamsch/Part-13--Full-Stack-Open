const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Session extends Model {}

Session.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		session: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        valid:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
	},
	{ sequelize, underscored: true, modelName: "session", timestamps: false }
);

module.exports = Session;