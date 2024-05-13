"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserToken = exports.registerUserToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../middlewares/error");
const token_1 = require("../utils/token");
const auth_data_1 = require("../data/auth-data");
async function registerUserToken(name, email, password, age, role = "user") {
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await (0, auth_data_1.registerUser)(name, email, hashedPassword, age, role);
    return user;
}
exports.registerUserToken = registerUserToken;
const loginUserToken = async (email, password) => {
    const userId = await (0, auth_data_1.getUserIdByEmail)(email);
    if (!userId)
        throw new error_1.ApiError("Usuario no encontrado", 404);
    const user = await (0, auth_data_1.loginUser)(email, password);
    if (!user)
        throw new error_1.ApiError("Credenciales incorrectas", 400);
    const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordMatch)
        throw new error_1.ApiError("Las contraseñas no coinciden", 400);
    const token = (0, token_1.generateToken)({ role: user.role || '' });
    return { id: userId, token, role: user.role };
};
exports.loginUserToken = loginUserToken;
