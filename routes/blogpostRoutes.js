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

const router = express.Router();

router
  .route('/')
  .get(resultCustomizationMiddleware(Blogpost), getBlogPosts)
  .post(createBlogPost);

router
  .route('/:id')
  .get(getBlogPostById)
  .put(updateBlogPost)
  .delete(deleteBlogPost);

module.exports = router;
