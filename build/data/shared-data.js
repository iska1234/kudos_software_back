"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSharedDataById = exports.getSharedDataById = exports.getSharedDataByUserId = exports.getSharedDataByAdminId = exports.insertSharedData = void 0;
const db_1 = require("../db");
async function insertSharedData(adminId, savedDataId, sharedWithUserId) {
    const insertedData = (await (0, db_1.query)("INSERT INTO shared_data (adminId, savedDataId, sharedWithUserId) VALUES ($1, $2, $3) RETURNING *", [adminId, savedDataId, sharedWithUserId])).rows[0];
    return insertedData;
}
exports.insertSharedData = insertSharedData;
async function getSharedDataByAdminId(adminId) {
    const result = await (0, db_1.query)(`SELECT sd.*, u.Name AS shared_with_user_name, sdata.description
     FROM shared_data sd
     INNER JOIN users u ON sd.sharedWithUserId = u.id
     INNER JOIN saved_data sdata ON sd.savedDataId = sdata.id
     WHERE sd.adminId = $1 AND sd.deleted = false
     ORDER BY sd.id ASC`, [adminId]);
    return result.rows;
}
exports.getSharedDataByAdminId = getSharedDataByAdminId;
async function getSharedDataByUserId(userId) {
    const result = await (0, db_1.query)(`SELECT sd.id, sd.adminId, sd.savedDataId, sd.sharedWithUserId, sd.created_at, sd.updated_at, u1.Name AS admin_name, sdata.description
     FROM shared_data sd
     INNER JOIN users u1 ON sd.adminId = u1.id
     INNER JOIN saved_data sdata ON sd.savedDataId = sdata.id
     WHERE sd.sharedWithUserId = $1 AND sd.deleted = false
     ORDER BY sd.id ASC`, [userId]);
    return result.rows;
}
exports.getSharedDataByUserId = getSharedDataByUserId;
async function getSharedDataById(sharedDataId) {
    const result = await (0, db_1.query)(`SELECT sd.id, sd.adminId, sd.saveddataid, sd.sharedWithUserId, sd.created_at, sd.updated_at,
              u1.Name AS admin_name, sdata.description, sdata.data_content,
              u2.Name AS shared_with_user_name
       FROM shared_data sd
       INNER JOIN users u1 ON sd.adminId = u1.id
       INNER JOIN saved_data sdata ON sd.saveddataid = sdata.id
       INNER JOIN users u2 ON sd.sharedWithUserId = u2.id
       WHERE sd.id = $1 AND sd.deleted = false`, [sharedDataId]);
    return result.rows;
}
exports.getSharedDataById = getSharedDataById;
async function deleteSharedDataById(sharedDataId) {
    const result = await (0, db_1.query)(`UPDATE shared_data SET deleted = true WHERE id = $1 RETURNING *`, [sharedDataId]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}
exports.deleteSharedDataById = deleteSharedDataById;
