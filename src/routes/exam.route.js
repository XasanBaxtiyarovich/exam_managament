const router = require("express").Router();

const isAuth = require("../middlewares/is-auth.middlewares");
const isAdmin = require("../middlewares/is-admin.middlewares");
const { createExam, getExams, getExam, updateExam, deleteExam } = require("../controllers/exam.conroller");

router.post("/create/exam", isAuth, isAdmin, createExam);
router.get("/get/exams", isAuth, isAdmin, getExams);
router.get("/get/exam/:id", isAuth, isAdmin, getExam);
router.put("/update/exam/:id", isAuth, isAdmin, updateExam);
router.delete("/delete/exam/:id", isAuth, isAdmin, deleteExam);

module.exports = router;