const router = require("express").Router();
const UserController = require("../controller/user.controller");

router.post("/", UserController.handleRegisterUser);

module.exports = router;