const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING(64),
        allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    exam_status: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  },  
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "users",
  }
);

module.exports = User;