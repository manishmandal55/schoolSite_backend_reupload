import express from 'express';
import { getAllAchievements, getAchievementById, createAchievement, updateAchievement, deleteAchievement } from '../../controllers/achievementController.js';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllAchievements);
router.get('/:id', getAchievementById);

router.post('/', authenticate, upload.array('images', 5), createAchievement);
router.patch('/:id', authenticate, upload.array('images', 5), updateAchievement);
router.delete('/:id', authenticate, deleteAchievement);

export default router;

