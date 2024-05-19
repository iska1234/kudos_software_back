"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersWithUserRole = void 0;
const index_1 = require("../db/index");
async function getUsersWithUserRole() {
    const { rows } = await (0, index_1.query)("SELECT id, name, email, age, role FROM users WHERE role = 'user'");
    return rows;
}
exports.getUsersWithUserRole = getUsersWithUserRole;
