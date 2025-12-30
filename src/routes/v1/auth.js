import express from 'express';
import { admainLogin, getCurrentAdmin } from '../../controllers/authController.js';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

router.post('/login',admainLogin);
router.get('/me',authenticate,getCurrentAdmin);

export default router;

