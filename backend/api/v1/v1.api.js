//packages
const express = require("express");
const router = express.Router();

//router
const userRouter = require("../../router/user.router.js");

router.use("/v1/user", userRouter);

module.exports = router;