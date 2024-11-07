import { Router } from 'express';
const router = Router();
import { checkContainer } from '../controllers/containerController.js';

router.post('/check', checkContainer);

export default router;
