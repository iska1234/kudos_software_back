"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSharedDataByIdController = exports.getSharedDataBySavedDataIdController = exports.getSharedDataByUserIdController = exports.getSharedDataByAdminIdController = exports.insertSharedDataController = void 0;
const error_1 = require("../middlewares/error");
const sharedDataService_1 = require("../services/sharedDataService");
async function insertSharedDataController(req, res, next) {
    try {
        const { adminId, savedDataId, sharedWithUserId } = req.body;
        if (!adminId || !savedDataId || !sharedWithUserId) {
            return next(new error_1.ApiError("Todos los campos (userId, savedDataId, sharedWithUserId) son obligatorios", 400));
        }
        const sharedData = await (0, sharedDataService_1.insertSharedDataService)(adminId, savedDataId, sharedWithUserId);
        return res.status(201).json({
            success: true,
            message: "Datos compartidos exitosamente",
            data: sharedData,
        });
    }
    catch (error) {
        console.error("Error al compartir los datos:", error);
        return next(new error_1.ApiError("Error al compartir los datos", 500));
    }
}
exports.insertSharedDataController = insertSharedDataController;
async function getSharedDataByAdminIdController(req, res, next) {
    try {
        const adminId = req.params["adminId"];
        if (!adminId) {
            throw new Error("Admin ID not found in request parameters");
        }
        const sharedData = await (0, sharedDataService_1.getSharedDataByAdminIdService)(Number(adminId));
        return res.status(200).json({
            success: true,
            data: sharedData,
        });
    }
    catch (error) {
        console.error("Error al obtener los datos compartidos por adminId:", error);
        return next(new error_1.ApiError("Error al obtener los datos compartidos por adminId", 500));
    }
}
exports.getSharedDataByAdminIdController = getSharedDataByAdminIdController;
async function getSharedDataByUserIdController(req, res, next) {
    try {
        const userId = req.params["userId"];
        if (!userId) {
            throw new Error("El userId no existe en los parametros");
        }
        const sharedData = await (0, sharedDataService_1.getSharedDataByUserIdService)(Number(userId));
        return res.status(200).json({
            success: true,
            data: sharedData,
        });
    }
    catch (error) {
        console.error("Error al obtener los datos compartidos por userId:", error);
        return next(new error_1.ApiError("Error al obtener los datos compartidos por userId", 500));
    }
}
exports.getSharedDataByUserIdController = getSharedDataByUserIdController;
async function getSharedDataBySavedDataIdController(req, res, next) {
    try {
        const sharedDataId = req.params['sharedDataId'];
        if (!sharedDataId) {
            throw new Error("Shared data ID not found in request parameters");
        }
        const sharedData = await (0, sharedDataService_1.getSharedDataByIdService)(Number(sharedDataId));
        return res.status(200).json({
            success: true,
            data: sharedData
        });
    }
    catch (error) {
        console.error("Error al obtener los datos compartidos por sharedDataId:", error);
        return next(new error_1.ApiError("Error al obtener los datos compartidos por sharedDataId", 500));
    }
}
exports.getSharedDataBySavedDataIdController = getSharedDataBySavedDataIdController;
async function deleteSharedDataByIdController(req, res, next) {
    try {
        const sharedDataId = req.params["sharedDataId"];
        if (!sharedDataId) {
            throw new Error("Shared data ID not found in request parameters");
        }
        const updatedSharedData = await (0, sharedDataService_1.deleteSharedDataByIdService)(Number(sharedDataId));
        return res.status(200).json({
            success: true,
            message: "Shared data deleted successfully",
            data: updatedSharedData
        });
    }
    catch (error) {
        console.error("Error al eliminar los datos compartidos:", error);
        return next(new error_1.ApiError("Error al eliminar los datos compartidos", 500));
    }
}
exports.deleteSharedDataByIdController = deleteSharedDataByIdController;
