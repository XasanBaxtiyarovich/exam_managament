const userRouter = require("./user.route");
const examRouter = require("./exam.route");
const groupRouter = require("./group.route");
const resultRouter = require("./result.routes");
const userGropsRouter = require("./user-groups.route");
const examAnswerRouter = require("./exam-answer.route");

module.exports = [ userRouter, groupRouter, userGropsRouter, examRouter, examAnswerRouter, resultRouter ];