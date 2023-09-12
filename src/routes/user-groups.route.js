const router = require("express").Router();

const isAuth = require("../middlewares/is-auth.middlewares");
const isAdmin = require("../middlewares/is-admin.middlewares");
const { createUserGrops, getUserGrops, getOneUserGrops, deleteUserGrops } = require("../controllers/user-groups.controller");

router.post("/create/userGroup", isAuth, isAdmin, createUserGrops);
router.get("/get/userGroups", isAuth, isAdmin, getUserGrops);
router.get("/get/userGroup/:id", isAuth, isAdmin, getOneUserGrops);
router.delete("delete/userGrops/:id", isAuth, isAdmin, deleteUserGrops);

module.exports = router;