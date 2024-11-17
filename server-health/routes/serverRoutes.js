import { Router } from 'express';
const router = Router();
import { checkServer } from '../controllers/serverController.js';

router.get('/check', checkServer);
// router.get('/socket', checkServerSocket);

export default router;
