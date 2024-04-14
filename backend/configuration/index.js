const port = 3151;

//packages
const express = require("express");
const http = require("http");
const cors = require("cors");

//configuration
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.set('trust proxy', true)

const bd = require("./database.connection");
const api = require("../api/api.manage");

app.use("/", api);

var server = http.createServer(app);

server.listen(port, () => console.log(`Server listening on port ${port}`));

app.get("/", (request, response) => {
    try {
        response.status(200).json({ timeStamp: Date.now() });
    } catch (error) {
        response.status(400).json({ status: false, message: error.message })
    }
})