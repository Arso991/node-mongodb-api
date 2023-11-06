var express = require('express');
var router = express.Router();
var userController = require("../controllers/usersController")


router.post("/register", userController.register);

router.post("/confirmation", userController.validation)

router.post("/login", userController.signIn)

module.exports = router;
