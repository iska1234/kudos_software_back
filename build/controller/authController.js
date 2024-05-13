"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const error_1 = require("../middlewares/error");
const users_1 = require("../models/users");
const authService_1 = require("../services/authService");
const register = async (req, res, next) => {
    try {
        const { name, email, password, age, role } = users_1.userSchema.parse(req.body);
        const user = await (0, authService_1.registerUserToken)(name, email, password, age || 0, role);
        return res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        return next(new error_1.ApiError("Error al registrar usuario: " + error.message, 400));
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { id, token, role } = await (0, authService_1.loginUserToken)(email, password);
        req.session.userId = id;
        return res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            data: { token, userId: id, role },
        });
    }
    catch (error) {
        console.error(error);
        return next(new error_1.ApiError("Credenciales incorrectas", 401));
    }
};
exports.login = login;
const logout = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        }
        else {
            res.clearCookie("connect.sid");
            res.json({ ok: true, message: "Logout exitoso" });
        }
    });
};
exports.logout = logout;
