"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdByEmail = exports.loginUser = exports.registerUser = void 0;
const index_1 = require("../db/index");
async function registerUser(name, email, password, age, role) {
    return (await (0, index_1.query)("INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, password, age, role])).rows[0];
}
exports.registerUser = registerUser;
async function loginUser(email, password) {
    const { rows, rowCount } = await (0, index_1.query)("SELECT * FROM users WHERE email = $1", [email]);
    if (rowCount === 0)
        return null;
    return rows[0];
}
exports.loginUser = loginUser;
async function getUserIdByEmail(email) {
    const { rows, rowCount } = await (0, index_1.query)("SELECT id FROM users WHERE email = $1", [email]);
    if (rowCount === 0)
        return null;
    return rows[0].id;
}
exports.getUserIdByEmail = getUserIdByEmail;
