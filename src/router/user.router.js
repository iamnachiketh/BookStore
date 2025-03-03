const router = require("express").Router();
const UserController = require("../controller/user.controller");
const { validateRequest } = require("../middlewares/validate");
const RequestValidation = require("../validators/user.validator");

router.post("/", validateRequest(RequestValidation.userSchema), UserController.handleRegisterUser);

router.post("/login", validateRequest(RequestValidation.userLogin), UserController.handleLoginUser);

module.exports = router;