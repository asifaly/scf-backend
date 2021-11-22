import { Router } from 'express';
import ApiController from '../controllers/ApiController';

const router = Router();
const apiController = new ApiController();

router.get('/:tablename', apiController.get);
router.post('/:tablename', apiController.post);
router.put('/:tablename/:recordid', apiController.put)

export default router;
