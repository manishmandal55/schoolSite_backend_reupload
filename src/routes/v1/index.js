import express from 'express';
import authRoutes from './auth.js';
import noticeRoutes from './notice.js';
import eventRoutes from './event.js';
import galleryRoutes from './gallery.js';
import teamRoutes from './team.js';
import homeRoutes from './home.js';
import resultRoutes from './result.js';
import vacancyRoutes from './vacancy.js';
import blogRoutes from './blog.js';
import achievementRoutes from './achievement.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/notices', noticeRoutes);
router.use('/events', eventRoutes);
router.use('/gallery', galleryRoutes);
router.use('/team', teamRoutes);
router.use('/home', homeRoutes);
router.use('/results', resultRoutes);
router.use('/vacancies', vacancyRoutes);
router.use('/blogs', blogRoutes);
router.use('/achievements', achievementRoutes);

export default router;

