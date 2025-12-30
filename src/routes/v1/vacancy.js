import express from 'express';
import { getAllVacancies, getVacancyById, getVacanciesByCategory, getVacancyCategories, createVacancy, updateVacancy, deleteVacancy } from '../../controllers/vacancyController.js';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllVacancies);
router.get('/categories', getVacancyCategories);
router.get('/category/:category_id', getVacanciesByCategory);
router.get('/:id', getVacancyById);

router.post('/', authenticate, createVacancy);
router.patch('/:id', authenticate, updateVacancy);
router.delete('/:id', authenticate, deleteVacancy);

export default router;
