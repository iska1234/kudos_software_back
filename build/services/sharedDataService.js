"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSharedDataByIdService = exports.getSharedDataByIdService = exports.getSharedDataByUserIdService = exports.getSharedDataByAdminIdService = exports.insertSharedDataService = void 0;
const shared_data_1 = require("../data/shared-data");
async function insertSharedDataService(adminId, savedDataId, sharedWithUserId) {
    const sharedData = await (0, shared_data_1.insertSharedData)(adminId, savedDataId, sharedWithUserId);
    return sharedData;
}
exports.insertSharedDataService = insertSharedDataService;
async function getSharedDataByAdminIdService(adminId) {
    const sharedData = await (0, shared_data_1.getSharedDataByAdminId)(adminId);
    return sharedData;
}
exports.getSharedDataByAdminIdService = getSharedDataByAdminIdService;
async function getSharedDataByUserIdService(userId) {
    const sharedData = await (0, shared_data_1.getSharedDataByUserId)(userId);
    return sharedData;
}
exports.getSharedDataByUserIdService = getSharedDataByUserIdService;
async function getSharedDataByIdService(savedDataId) {
    const sharedData = await (0, shared_data_1.getSharedDataById)(savedDataId);
    return sharedData;
}
exports.getSharedDataByIdService = getSharedDataByIdService;
async function deleteSharedDataByIdService(sharedDataId) {
    const deletedData = await (0, shared_data_1.deleteSharedDataById)(sharedDataId);
    return deletedData;
}
exports.deleteSharedDataByIdService = deleteSharedDataByIdService;
