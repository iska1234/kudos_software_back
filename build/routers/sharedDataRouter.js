"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharedDataController_1 = require("../controller/sharedDataController");
const authorize_1 = require("../middlewares/authorize");
const authenticate_1 = require("../middlewares/authenticate");
const sharedDataRouter = express_1.default.Router();
sharedDataRouter.post("/shared", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), sharedDataController_1.insertSharedDataController);
sharedDataRouter.get("/admin/:adminId", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), sharedDataController_1.getSharedDataByAdminIdController);
sharedDataRouter.get("/user/:userId", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("user"), sharedDataController_1.getSharedDataByUserIdController);
sharedDataRouter.get("/saved/:sharedDataId", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("user", "admin"), sharedDataController_1.getSharedDataBySavedDataIdController);
sharedDataRouter.put("/delete/:sharedDataId", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), sharedDataController_1.deleteSharedDataByIdController);
exports.default = sharedDataRouter;
