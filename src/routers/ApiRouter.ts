import { Router } from 'express';
import ApiController from '../controllers/ApiController';
import { validateSchema } from '../middleware/schemaValidator';

const router = Router();
const apiController = new ApiController();

router.get('/:tablename', apiController.get);
router.post('/:tablename', [validateSchema], apiController.post);
router.put('/:tablename/:recordid', [validateSchema], apiController.put)

export default router;
