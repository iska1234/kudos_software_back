import express from "express";
import { getSharedDataByAdminIdController, getSharedDataByUserIdController, insertSharedDataController } from "../controller/sharedDataController";
import { authorize } from "../middlewares/authorize";
import { authenticateHandler } from "../middlewares/authenticate";

const sharedDataRouter = express.Router();

sharedDataRouter.post("/shared",authenticateHandler, authorize("admin"),  insertSharedDataController);
sharedDataRouter.get("/admin/:adminId",authenticateHandler, authorize("admin"),  getSharedDataByAdminIdController);
sharedDataRouter.get("/user/:userId",authenticateHandler, authorize("user"),  getSharedDataByUserIdController);


export default sharedDataRouter;