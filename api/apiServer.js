var express = require("express");
const Users = require("../data/datalayer.js");
let User = new Users();
var app = express();

module.exports = function apiServer(port) {
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

    app.get("/api/users", (req, res) => {
        //Calculate users to show
        const parsedData = User.getAllUsers();
        const usersPerPage = Number(req.query.size);
        const currentPage = Number(req.query.page);
        const offset = (currentPage - 1) * usersPerPage;

        //Final page
        const maxPage = Math.ceil(parsedData.length / usersPerPage);

        const response = {
            users: parsedData.slice(offset, offset + usersPerPage),
            maxPage: maxPage,
        };

        res.json(response);
    });

    app.post("/api/addUser", (req, _res) => {
        User.addUser(req.body);
    });

    app.post("/api/modifyUser/:id", (req, _res) => {
        const id = req.params.id;
        User.modifyUser(id, req.body);
    });

    app.get("/api/user/:id", (req, res) => {
        const id = req.params.id;
        const parsedData = User.getAllUsers();
        const index = User.getIndexById(id, parsedData);
        res.json(parsedData[index]);
    });

    app.delete("/api/deleteUser/:id", (req, _res) => {
        const id = req.params.id;
        User.deleteUser(id);
    });

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
};
