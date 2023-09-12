const Exam = require("./exam.model");
const User = require("./user.model");
const Group = require("./group.model");
const Result = require("./result.model");
const User_Groups = require("./user-groups.model");
const Exam_answer = require("./exam-answer.model");


User.hasMany(User_Groups, {foreignKey: "user_id"});
User_Groups.belongsTo(User, {foreignKey: "user_id"});

Group.hasMany(User_Groups, {foreignKey: "group_id"});
User_Groups.belongsTo(Group, {foreignKey: "group_id"});

Group.hasMany(Exam, {foreignKey: "group_id"});
Exam.belongsTo(Group, {foreignKey: "group_id"});

Exam.hasMany(Exam_answer, {foreignKey: "exam_id"});
Exam_answer.belongsTo(Exam, {foreignKey: "exam_id"});

User.hasMany(Exam_answer, {foreignKey: "user_id"});
Exam_answer.belongsTo(User, {foreignKey: "user_id"});

Exam.hasMany(Result, {foreignKey: "exam_id"});
Result.belongsTo(Exam, {foreignKey: "exam_id"});

User.hasMany(Result, {foreignKey: "user_id"});
Result.belongsTo(User, {foreignKey: "user_id"});