"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSavedDataBySavedDataId = exports.getAllSavedData = exports.saveData = void 0;
const index_1 = require("../db/index");
async function saveData(description, dataContent, userId) {
    const insertedData = (await (0, index_1.query)("INSERT INTO saved_data (description, data_content, user_Id) VALUES ($1, $2, $3) RETURNING *", [description, dataContent, userId])).rows[0];
    return insertedData;
}
exports.saveData = saveData;
async function getAllSavedData(userId) {
    const result = await (0, index_1.query)("SELECT sd.*, u.Name AS user_name FROM saved_data sd INNER JOIN users u ON sd.user_id = u.id WHERE sd.user_id = $1 ORDER BY sd.id ASC;", [userId]);
    return result.rows;
}
exports.getAllSavedData = getAllSavedData;
async function getAllSavedDataBySavedDataId(savedDataId) {
    const result = await (0, index_1.query)("SELECT sd.*, u.Name AS user_name FROM saved_data sd INNER JOIN users u ON sd.user_id = u.id WHERE sd.id = $1", [savedDataId]);
    return result.rows;
}
exports.getAllSavedDataBySavedDataId = getAllSavedDataBySavedDataId;
