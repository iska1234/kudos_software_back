"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const error_1 = __importDefault(require("./middlewares/error"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const session_1 = __importDefault(require("./middlewares/session"));
dotenv_1.default.config();
const morgan = require("morgan");
const app = (0, express_1.default)();
const port = 5500;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, session_1.default)());
app.use((0, cors_1.default)());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use("/auth", authRouter_1.default);
app.use(error_1.default);
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));