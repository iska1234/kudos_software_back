"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSavedDataByIdController = exports.getAllSavedDataController = exports.saveDataController = void 0;
const error_1 = require("../middlewares/error");
const savedDataService_1 = require("../services/savedDataService");
async function saveDataController(req, res, next) {
    try {
        const { description, dataContent } = req.body;
        const userId = req.userId;
        if (!userId) {
            return next(new error_1.ApiError("ID de usuario no encontrado en la solicitud", 400));
        }
        if (!description || !dataContent) {
            return next(new error_1.ApiError("Descripción y enlace de datos son obligatorios", 400));
        }
        const savedData = await (0, savedDataService_1.saveUserData)(description, dataContent, userId);
        return res.status(201).json({
            success: true,
            message: "Datos guardados exitosamente",
            data: savedData,
        });
    }
    catch (error) {
        console.error("Error al guardar los datos:", error);
        return next(new error_1.ApiError("Error al guardar los datos", 500));
    }
}
exports.saveDataController = saveDataController;
async function getAllSavedDataController(req, res, next) {
    try {
        const userId = req.params['userId'];
        if (!userId) {
            throw new Error("User ID not found in request parameters");
        }
        const savedData = await (0, savedDataService_1.getAllSavedDataService)(Number(userId));
        return res.status(200).json({
            success: true,
            data: savedData,
        });
    }
    catch (error) {
        console.error("Error al obtener todos los datos guardados:", error);
        return next(new error_1.ApiError("Error al obtener todos los datos guardados", 500));
    }
}
exports.getAllSavedDataController = getAllSavedDataController;
async function getAllSavedDataByIdController(req, res, next) {
    try {
        const savedDataId = req.params['savedDataId'];
        if (!savedDataId) {
            throw new Error("Saved data ID not found in request parameters");
        }
        const savedData = await (0, savedDataService_1.getAllSavedDataByIdService)(Number(savedDataId));
        return res.status(200).json({
            success: true,
            data: savedData,
        });
    }
    catch (error) {
        console.error("Error al obtener los datos guardados por ID:", error);
        return next(new error_1.ApiError("Error al obtener los datos guardados por ID", 500));
    }
}
exports.getAllSavedDataByIdController = getAllSavedDataByIdController;
