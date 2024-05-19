"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const error_1 = require("../middlewares/error");
const users_1 = require("../models/users");
const authService_1 = require("../services/authService");
const zod_1 = __importDefault(require("zod"));
const auth_data_1 = require("../data/auth-data");
const register = async (req, res, next) => {
    try {
        const { name, email, password, age, role } = users_1.userSchema.parse(req.body);
        const existingUser = await (0, auth_data_1.verifyEmail)(email);
        if (existingUser) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "El correo electrónico ya está registrado",
                }
            });
        }
        const user = await (0, authService_1.registerUserToken)(name, email, password, age || 0, role);
        return res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente",
            data: user,
        });
    }
    catch (error) {
        console.error("Error en el registro:", error);
        if (error.code === "23505" && error.constraint === "users_email_key") {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "El correo electrónico ya está registrado",
                }
            });
        }
        else if (error instanceof error_1.ApiError) {
            return res.status(error.status).json({
                ok: false,
                error: { message: error.message, details: error.details || {} }
            });
        }
        else if (error instanceof zod_1.default.ZodError) {
            const details = {};
            error.errors.forEach(err => {
                switch (err.path[0]) {
                    case 'name':
                        details['name'] = "El campo 'name' es obligatorio";
                        break;
                    case 'email':
                        details['email'] = "El formato del campo 'email' es inválido";
                        break;
                    case 'password':
                        details['password'] = "La contraseña debe tener al menos 5 caracteres";
                        break;
                    case 'age':
                        details['age'] = "El campo 'age' debe ser un número positivo";
                        break;
                    default:
                        break;
                }
            });
            if (!('name' in req.body)) {
                details['name'] = "No se encontró el campo 'name' en la solicitud";
            }
            if (!('email' in req.body)) {
                details['email'] = "No se encontró el campo 'email' en la solicitud";
            }
            if (!('password' in req.body)) {
                details['password'] = "No se encontró el campo 'password' en la solicitud";
            }
            if (!('age' in req.body)) {
                details['age'] = "No se encontró el campo 'age' en la solicitud";
            }
            const errorMessage = "Error en el registro";
            return res.status(400).json({
                ok: false,
                error: {
                    message: errorMessage,
                    details: details
                }
            });
        }
        else {
            return next(new error_1.ApiError("Error interno del servidor", 500));
        }
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
            data: { token, role },
        });
    }
    catch (error) {
        console.error("Error en el inicio de sesión:", error);
        if (error instanceof error_1.ApiError) {
            const errors = [];
            if (error.details) {
                for (const [key, value] of Object.entries(error.details)) {
                    errors.push({ [key]: value });
                }
            }
            return res.status(error.status).json({
                ok: false,
                error: { message: error.message, details: errors }
            });
        }
        else {
            return next(new error_1.ApiError("Error interno del servidor", 500));
        }
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
