import express from "express";
import {
  deleteSharedDataByIdController,
  getSharedDataByAdminIdController,
  getSharedDataBySavedDataIdController,
  getSharedDataByUserIdController,
  insertSharedDataController,
} from "../controller/sharedDataController";
import { authorize } from "../middlewares/authorize";
import { authenticateHandler } from "../middlewares/authenticate";

const sharedDataRouter = express.Router();

sharedDataRouter.post(
  "/shared",
  authenticateHandler,
  authorize("admin"),
  insertSharedDataController
);
sharedDataRouter.get(
  "/admin/:adminId",
  authenticateHandler,
  authorize("admin"),
  getSharedDataByAdminIdController
);
sharedDataRouter.get(
  "/user/:userId",
  authenticateHandler,
  authorize("user"),
  getSharedDataByUserIdController
);
sharedDataRouter.get(
  "/saved/:sharedDataId",
  authenticateHandler,
  authorize("user", "admin"),
  getSharedDataBySavedDataIdController
);
sharedDataRouter.put(
  "/delete/:sharedDataId",
  authenticateHandler,
  authorize("admin"),
  deleteSharedDataByIdController
);

export default sharedDataRouter;
