const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Result extends Model {}

Result.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ball: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "result",
  }
);

module.exports = Result;