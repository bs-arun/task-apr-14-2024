//packages
const mongoose = require("mongoose");

//required files
const prefixString = require("../helpers/db.js");

const userLoginSchema = new mongoose.Schema({
    userId: { type: String, default: "" },
    email: { type: String, default: "" },
    ip: { type: String, default: "" },
    os: { type: String, default: "" },
    browser: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("userLogin", userLoginSchema, prefixString.collectionPrefix + "nigoLresu");