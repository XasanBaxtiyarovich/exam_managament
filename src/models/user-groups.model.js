const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class User_Groups extends Model {}

User_Groups.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "user_groups",
  }
);

module.exports = User_Groups;