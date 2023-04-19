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
     * @param {Number} id
     * @param {User[]} rawData
     * @returns {Number}
     */
    getIndexById(id, rawData) {
        console.log(`id is ${id}`);
        const index = rawData.findIndex((user) => {
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
        const rawData = this.getAllUsers();
        return rawData[length - 1].id + 1;
    }

    /**
     * @param {User} user
     */
    addUser(user) {
        user.id = getNewId();
        user.created_at = new Date().toISOString();

        let rawData = this.getAllUsers();
        rawData.push(user);

        fs.writeFileSync(file, rawData);
    }

    /**
     * @param {Number} id
     * @param {User} newUser
     */
    modifyUser(id, newUser) {
        let rawData = this.getAllUsers();
        let index = this.getIndexById(id, rawData);

        for (let property in rawData[index]) {
            if (newUser[property] == undefined) continue;
            rawData[index][property] = newUser[property];
        }

        fs.writeFileSync(file, rawData);
    }

    /**
     * @param {Number} id
     */
    deleteUser(id) {
        let rawData = this.getAllUsers();
        const index = this.getIndexById(id, rawData);

        rawData.splice(index, 1);

        fs.writeFileSync(file, rawData);
    }
}

module.exports = Users;
