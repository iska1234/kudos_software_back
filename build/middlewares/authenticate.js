"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateHandler = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const jwtSecret = process.env["JWT_SECRET"] || '';
function authenticateHandler(req, _res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.log("No se encontró token de autorización");
        return next(new error_1.ApiError("No autorizado", 401));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log("Payload verificado:", payload);
        req.userId = payload.userId;
        req.userRole = payload.userRole;
        next();
    }
    catch (error) {
        console.error("Error al verificar el token:", error);
        return next(new error_1.ApiError("No autorizado", 401));
    }
}
exports.authenticateHandler = authenticateHandler;
