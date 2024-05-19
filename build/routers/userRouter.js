"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middlewares/authenticate");
const authorize_1 = require("../middlewares/authorize");
const userController_1 = require("../controller/userController");
const userRouter = express_1.default.Router();
userRouter.get('/all', authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), userController_1.getAllUsersWithUserController);
exports.default = userRouter;
