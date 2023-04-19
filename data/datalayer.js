const fs = require("fs");

/**
 * @typedef {Object} User
 * @property {Number|undefined} id
 * @property {String} email
 * @property {String} first
 * @property {String} last
 * @property {String} company
 * @property {String|undefined} created_at //Date in ISO 8601 Extended Format
 * @property {String} country
 */

const file = "./data/users.json";

class Users {
    constructor() {}

    /**
     * @returns {User[]}
     */
    getAllUsers() {
        return JSON.parse(fs.readFileSync(file));
    }

    /**
     * @param {User[]} parsedData
     */
    writeToFile(parsedData) {
        fs.writeFileSync(file, JSON.stringify(parsedData));
    }

    /**
     * @param {Number} id
     * @param {User[]} parsedData
     * @returns {Number}
     */
    getIndexById(id, parsedData) {
        const index = parsedData.findIndex((user) => {
            return user.id == id;
        });

        if (index == -1) {
            console.log("Customer not found");
            return;
        }

        return index;
    }

    /**
     * @returns {Number}
     */
    getNewId() {
        const parsedData = this.getAllUsers();
        return parsedData[length - 1].id + 1;
    }

    /**
     * @param {User} user
     */
    addUser(user) {
        user.id = getNewId();
        user.created_at = new Date().toISOString();

        let parsedData = this.getAllUsers();
        parsedData.push(user);

        this.writeToFile(parsedData);
    }

    /**
     * @param {Number} id
     * @param {User} newUser
     */
    modifyUser(id, newUser) {
        let parsedData = this.getAllUsers();
        let index = this.getIndexById(id, parsedData);

        for (let property in parsedData[index]) {
            if (newUser[property] == undefined) continue;
            parsedData[index][property] = newUser[property];
        }

        this.writeToFile(parsedData);
    }

    /**
     * @param {Number} id
     */
    deleteUser(id) {
        let parsedData = this.getAllUsers();
        const index = this.getIndexById(id, parsedData);

        parsedData.splice(index, 1);

        this.writeToFile(parsedData);
    }
}

module.exports = Users;
