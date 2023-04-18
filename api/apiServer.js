var express = require("express");
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
    app.use(function (_req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    app.get("./test", function (_req, res) {
        res.json({ Bajs: ["Jepp"] });
    });

    app.listen(port, function () {
        console.log(`Server listening on port ${port}`);
    });
};
