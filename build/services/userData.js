"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersWithUserRole = void 0;
const user_data_1 = require("../data/user-data");
async function getAllUsersWithUserRole() {
    const users = await (0, user_data_1.getUsersWithUserRole)();
    return users;
}
exports.getAllUsersWithUserRole = getAllUsersWithUserRole;
