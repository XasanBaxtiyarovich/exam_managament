const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Exam_answer extends Model {}

Exam_answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    viewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    sequelize,
    tableName: "exam_answer",
  }
);

module.exports = Exam_answer;