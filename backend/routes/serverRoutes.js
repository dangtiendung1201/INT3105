import { Router } from 'express';
const router = Router();
import { checkServer } from '../controllers/serverController.js';

router.post('/check', checkServer);

export default router;
