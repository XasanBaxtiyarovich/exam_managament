const router = require("express").Router();

const isAuth = require("../middlewares/is-auth.middlewares");
const isAdmin = require("../middlewares/is-admin.middlewares");
const { createUser, getUsers, getUser, updateUser, deleteUser, userLogin, updatePassword } = require("../controllers/user.controller");

router.post("/create/user", isAuth, isAdmin, createUser);
router.post("/auth/login", userLogin);
router.get("/get/users", isAuth, isAdmin, getUsers);
router.get("/get/user/:id", isAuth, getUser);
router.put("/update/user/:id", isAuth, updateUser);
router.put("/update/password/:id", isAuth, updatePassword);
router.delete("/delete/user/:id", isAuth, isAdmin, deleteUser);

module.exports = router; 