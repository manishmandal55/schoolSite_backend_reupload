import express from 'express';
import { getAllResults, getResultById, createResult, updateResult, deleteResult } from '../../controllers/resultController.js';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllResults);
router.get('/:id', getResultById);

router.post('/', authenticate, upload.single('attachment'), createResult);
router.patch('/:id', authenticate, upload.single('attachment'), updateResult);
router.delete('/:id', authenticate, deleteResult);

export default router;


