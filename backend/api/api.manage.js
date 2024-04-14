//packages
const express = require("express");
const router = express.Router();

const routerV1 = require("./v1/v1.api");

router.use("/api", routerV1);

module.exports = router;