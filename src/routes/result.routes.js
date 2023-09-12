const router = require("express").Router();

const isAuth = require("../middlewares/is-auth.middlewares");
const isAdmin = require("../middlewares/is-admin.middlewares");
const { createResult, getResults, getResult, updateResult, deleteResult } = require("../controllers/result.controller");

router.post("/create/result", isAuth, createResult);
router.get("/get/results", isAuth, isAdmin, getResults);
router.get("/get/result/:id", isAuth, isAdmin, getResult);
router.put("/update/result/:id", isAuth, isAdmin, updateResult);
router.delete("/delete/result/:id", isAuth, isAdmin, deleteResult);

module.exports = router;