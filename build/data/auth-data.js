"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.getUserIdByEmail = exports.loginUser = exports.registerUser = void 0;
const index_1 = require("../db/index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function registerUser(name, email, password, age, role) {
    const insertedUser = (await (0, index_1.query)("INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, password, age, role])).rows[0];
    const userWithoutPassword = await (0, index_1.query)("SELECT id, name, email, age, role FROM users WHERE id = $1", [
        insertedUser.id,
    ]);
    return userWithoutPassword.rows[0];
}
exports.registerUser = registerUser;
async function loginUser(email, password) {
    const { rows, rowCount } = await (0, index_1.query)("SELECT * FROM users WHERE email = $1", [email]);
    if (rowCount === 0)
        return null;
    const user = rows[0];
    const storedHashedPassword = user.password;
    const passwordMatch = await bcryptjs_1.default.compare(password, storedHashedPassword);
    if (!passwordMatch)
        return null;
    return user;
}
exports.loginUser = loginUser;
async function getUserIdByEmail(email) {
    const { rows, rowCount } = await (0, index_1.query)("SELECT id FROM users WHERE email = $1", [email]);
    if (rowCount === 0)
        return null;
    return rows[0].id;
}
exports.getUserIdByEmail = getUserIdByEmail;
async function verifyEmail(email) {
    const { rows, rowCount } = await (0, index_1.query)("SELECT email FROM users WHERE email = $1", [email]);
    if (rowCount === 0)
        return null;
    return rows[0].id;
}
exports.verifyEmail = verifyEmail;
