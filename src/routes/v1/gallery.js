import express from 'express';
import { getAllGallery,getGalleryByCategory,getGalleryCategories,createGalleryItem,deleteGalleryItem } from '../../controllers/galleryController.js';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

//public routes haru
router.get('/', getAllGallery);
router.get('/categories', getGalleryCategories);
router.get('/category/:category_id', getGalleryByCategory);

// Protected routes
router.post('/', authenticate, upload.single('image'), createGalleryItem);
router.delete('/:id', authenticate, deleteGalleryItem);

export default router;

