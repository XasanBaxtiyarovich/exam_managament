const router = require("express").Router();

const isAuth = require("../middlewares/is-auth.middlewares");
const isAdmin = require("../middlewares/is-admin.middlewares");
const { createGroup, getGroups, getGroup, updateGroup, deleteGroup } = require("../controllers/group.controller");

router.post("/create/group", isAuth, isAdmin, createGroup);
router.get("/get/group/:id", isAuth, getGroup);
router.get("/get/groups", isAuth, isAdmin, getGroups);
router.put("/update/group/:id", isAuth, isAdmin, updateGroup);
router.delete("/delete/group/:id", isAuth, isAdmin, deleteGroup);

module.exports = router;