const router = require("express").Router();

const isAuth = require("../middlewares/is-auth.middlewares");
const isAdmin = require("../middlewares/is-admin.middlewares");
const { createExamAnswer, getExamsAnsews, getExamAnswer, updateExamAnswer, deleteExamAnswer } = require("../controllers/exam-answer.controller");

router.post("/create/ExamAnswer", isAuth, createExamAnswer);
router.get("/get/ExamsAnswers", isAuth, isAdmin, getExamsAnsews);
router.get("/get/ExamAnswer/:id", isAuth, isAdmin, getExamAnswer);
router.put("/update/ExamAnswer/:id", isAuth, isAdmin, updateExamAnswer);
router.delete("/delete/ExamAnswer/:id", isAuth, isAdmin, deleteExamAnswer);

module.exports = router;