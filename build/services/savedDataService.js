"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSavedDataByIdService = exports.getAllSavedDataService = exports.saveUserData = void 0;
const saved_data_1 = require("../data/saved-data");
async function saveUserData(description, dataContent, userId) {
    const savedData = await (0, saved_data_1.saveData)(description, dataContent, userId);
    return savedData;
}
exports.saveUserData = saveUserData;
async function getAllSavedDataService(userId) {
    const savedData = await (0, saved_data_1.getAllSavedData)(userId);
    return savedData;
}
exports.getAllSavedDataService = getAllSavedDataService;
async function getAllSavedDataByIdService(savedDataId) {
    const savedData = await (0, saved_data_1.getAllSavedDataBySavedDataId)(savedDataId);
    return savedData;
}
exports.getAllSavedDataByIdService = getAllSavedDataByIdService;
