// const fs = require("fs");
import fs from "fs";
// import "../html/clients.html";
let rawdata = fs.readFileSync("../json/users.json");
let users = JSON.parse(rawdata);

let el; // Variable to hold found element

// Search and count countries
const countryList = [];
users.forEach(({ country }) => {
    el = countryList.find((e) => e.country == country);
    if (el) {
        el["count"]++;
    } else {
        countryList.push({ country: country, count: 1 });
    }
});
// Sort countries by count
countryList.sort((a, b) => b.count - a.count);

// Search and count companies
const companyList = [];
users.forEach(({ company }) => {
    el = companyList.find((e) => e.company == company);
    if (el) {
        el["count"]++;
    } else {
        companyList.push({ company: company, count: 1 });
    }
});
// Sort companies by count
companyList.sort((a, b) => b.count - a.count);

export default { users, countryList, companyList };

// const prompt = require("prompt-sync")({ sigint: true });
// const dispOption = Number(
//     prompt(
//         'Input "1" to view count of countries, and "2" to view count of companies\n'
//     )
// );

// switch (dispOption) {
//     case 1:
//         console.log(countryList);
//         break;

//     case 2:
//         console.log(companyList);
//         break;
//     default:
//         console.log("Incorrect input");
// }
