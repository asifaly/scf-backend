import { Router } from 'express';
import ApiController from '../controllers/ApiController';

const router = Router();
const apiController = new ApiController();

router.get('/:tablename', apiController.get);

export default router;
