"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersWithUserController = void 0;
const error_1 = require("../middlewares/error");
const userData_1 = require("../services/userData");
async function getAllUsersWithUserController(_req, res, next) {
    try {
        const savedData = await (0, userData_1.getAllUsersWithUserRole)();
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
exports.getAllUsersWithUserController = getAllUsersWithUserController;
