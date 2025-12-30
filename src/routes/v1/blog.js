import express from 'express';
import { getAllBlogs, getBlogById, getBlogsByCategory, getBlogCategories, createBlog, updateBlog, deleteBlog, createBlogCategory, updateBlogCategory, deleteBlogCategory } from '../../controllers/blogController.js';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/categories', getBlogCategories);
router.get('/category/:category_id', getBlogsByCategory);
router.get('/:id', getBlogById);

// Protected routes (admin only)
router.post('/', authenticate, upload.single('image'), createBlog);
router.patch('/:id', authenticate, upload.single('image'), updateBlog);
router.delete('/:id', authenticate, deleteBlog);

// Category routes (admin only)
router.post('/categories', authenticate, createBlogCategory);
router.patch('/categories/:id', authenticate, updateBlogCategory);
router.delete('/categories/:id', authenticate, deleteBlogCategory);

export default router;

