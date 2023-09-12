const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Group extends Model {}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    group_name: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    group_description: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "groups",
  }
);

module.exports = Group;