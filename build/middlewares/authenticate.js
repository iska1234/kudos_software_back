"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
require("dotenv/config");
const jwtSecret = process.env['JWT_SECRET'] || '';
function authenticateHandler(req, _res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new error_1.ApiError("No se encontró token de autorización", 401));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.userId = payload.userId;
        req.userRole = payload.role;
        next();
    }
    catch (error) {
        return next(new error_1.ApiError(`Error al verificar el token: ${error}`, 401));
    }
}
exports.authenticateHandler = authenticateHandler;
