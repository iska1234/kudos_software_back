"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const error_1 = require("./error");
function authorize(...allowedRoles) {
    return (req, _res, next) => {
        const role = req.userRole;
        if (!role) {
            console.log("No se encontró el rol del usuario");
            return next(new error_1.ApiError("No autorizado", 401));
        }
        if (allowedRoles.includes(role)) {
            next();
        }
        else {
            console.log("Acceso denegado");
            next(new error_1.ApiError("Acceso denegado", 403));
        }
    };
}
exports.authorize = authorize;
