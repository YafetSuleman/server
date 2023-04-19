var express = require("express");
const Users = require("../data/datalayer.js");
let user = new Users();
var app = express();

module.exports = function apiServer(port) {
    app.use((req, _res, next) => {
        //Print method and URL of each request
        console.log(`${req.method} ${req.url}`);
        next();
    });

    //Parse incoming JSON requests
    app.use(express.json());

    //Allow cross app communication
    app.use((_req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.get("/test", (_req, res) => {
        res.json({ Bajs: ["Jepp"] });
    });

    app.get("/api/users", (_req, res) => {
        const parsedData = user.getAllUsers();
        res.json(parsedData);
    });

    app.get("/api/user", (req, res) => {
        const id = req.query.id;
        const rawData = user.getAllUsers();
        const index = user.getIndexById(id, rawData);
        res.json(rawData[index]);
    });

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};
