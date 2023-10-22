const express = require('express');
const {
  getBlogPosts,
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogpostController');
const Blogpost = require('../models/Blogpost');
const resultCustomizationMiddleware = require('../middleware/resultCutomizationMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(resultCustomizationMiddleware(Blogpost), getBlogPosts)
  .post(protect, admin, createBlogPost);

router
  .route('/:id')
  .get(getBlogPostById)
  .put(protect, admin, updateBlogPost)
  .delete(protect, admin, deleteBlogPost);

module.exports = router;
