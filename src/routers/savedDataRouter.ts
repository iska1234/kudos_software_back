import express from 'express';
import { getAllSavedDataByIdController, getAllSavedDataController, saveDataController } from '../controller/saveDataController';
import { authenticateHandler } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';


const savedDataRouter = express.Router();

savedDataRouter.post('/upload', authenticateHandler, authorize("admin"), saveDataController);
savedDataRouter.get('/all/:userId', authenticateHandler, authorize("admin"), getAllSavedDataController);
savedDataRouter.get('/detail/:savedDataId', authenticateHandler, authorize("admin"), getAllSavedDataByIdController);


export default savedDataRouter;