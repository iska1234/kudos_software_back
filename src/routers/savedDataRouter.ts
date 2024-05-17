import express from 'express';
import { saveDataController } from '../controller/saveDataController';
import { authenticateHandler } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';


const savedDataRouter = express.Router();

savedDataRouter.post('/create', authenticateHandler, authorize("admin"), saveDataController);

export default savedDataRouter;
