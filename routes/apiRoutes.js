import { Router } from 'express';
const router = Router();
import { checkApi } from '../controllers/apiController.js';

router.post('/check', checkApi);

export default router;
