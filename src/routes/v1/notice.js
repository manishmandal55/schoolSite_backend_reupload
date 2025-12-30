import express from 'express';
import { getAllNotices, getNoticeById, createNotice, getNoticeCategories, deleteNotice, updateNotice, getNoticesByCategory, createNoticeCategory, updateNoticeCategory, deleteNoticeCategory } from '../../controllers/noticeController.js';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

router.get('/', getAllNotices);
router.get('/categories', getNoticeCategories);
router.get('/category/:category_id', getNoticesByCategory);
router.get('/:id', getNoticeById);

router.post('/', authenticate, upload.single('attachment'), createNotice);
router.patch('/:id', authenticate, upload.single('attachment'), updateNotice);
router.delete('/:id', authenticate, deleteNotice);

router.post('/categories', authenticate, createNoticeCategory);
router.patch('/categories/:id', authenticate, updateNoticeCategory);
router.delete('/categories/:id', authenticate, deleteNoticeCategory);

export default router;
