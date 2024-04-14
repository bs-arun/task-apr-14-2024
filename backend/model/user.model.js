//packages
const mongoose = require("mongoose");

//required files
const prefixString = require("../helpers/db.js");

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema, prefixString.collectionPrefix + "resu");