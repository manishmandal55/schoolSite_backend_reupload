import express from 'express';
import { getAllEvents, getEventById, createEvent, deleteEvent, updateEvent } from '../../controllers/eventController.js';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);

router.post('/', authenticate, upload.single('pdf'), createEvent);
router.patch('/:id', authenticate, upload.single('pdf'), updateEvent);
router.delete('/:id', authenticate, deleteEvent);

export default router;
