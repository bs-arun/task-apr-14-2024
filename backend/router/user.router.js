//packages
const express = require("express");
const router = express.Router();

//controller
const userController = require("../controller/user.controller.js");
const commonService = require("../helpers/common.service.js");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/newToken", userController.newAccessToken);
router.get("/history", commonService.verifyAccessToken, userController.loginHistory);

module.exports = router;