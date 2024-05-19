"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const saveDataController_1 = require("../controller/saveDataController");
const authenticate_1 = require("../middlewares/authenticate");
const authorize_1 = require("../middlewares/authorize");
const savedDataRouter = express_1.default.Router();
savedDataRouter.post('/upload', authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), saveDataController_1.saveDataController);
savedDataRouter.get('/all/:userId', authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), saveDataController_1.getAllSavedDataController);
savedDataRouter.get('/detail/:savedDataId', authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), saveDataController_1.getAllSavedDataByIdController);
exports.default = savedDataRouter;
