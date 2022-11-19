const router = require("express").Router();
const userController = require("../controller/userController");
var cors = require("cors");
const corsOptions = require("../index");
router.post("/login", cors(corsOptions), userController.login);
//router.post("/register",cors(corsOptions), userController.register);

module.exports = router;
