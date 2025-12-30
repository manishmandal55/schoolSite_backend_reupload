import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';
import { getAllSliders, getSliderById, createSlider, updateSlider, deleteSlider,createFAQ,getAllFAQs,getFAQById,updateFAQ,deleteFAQ,createReview,getAllReviews,updateReview,deleteReview} from '../../controllers/homeController.js';

const router = express.Router();

router.get('/sliders', getAllSliders);
router.get('/sliders/:id', getSliderById);
router.post('/sliders', authenticate, upload.single('image'), createSlider);
router.put('/sliders/:id', authenticate, upload.single('image'), updateSlider);
router.delete('/sliders/:id', authenticate, deleteSlider);

router.get('/faqs', getAllFAQs);
router.get('/faqs/:id', getFAQById);
router.post('/faqs', authenticate, createFAQ);
router.put('/faqs/:id', authenticate, updateFAQ);
router.delete('/faqs/:id', authenticate, deleteFAQ);

router.get('/reviews', getAllReviews); 
router.post('/reviews', upload.single('image'), createReview); 
router.put('/reviews/:id', authenticate, updateReview); 
router.delete('/reviews/:id', authenticate, deleteReview);

export default router;

