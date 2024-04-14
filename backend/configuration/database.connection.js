//packages
const mongoose = require("mongoose");

//files require
const connectionFile = require("../helpers/db.js");

mongoose.connect(connectionFile.connectionString).then(connect => {
    console.log("database successfully connected!")
}).catch(error => {
    console.log(`database connection issue ${error.message}`);
})