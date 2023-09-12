const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Exam extends Model {}

Exam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    passing_score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "exam",
  }
);

module.exports = Exam;