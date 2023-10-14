const express = require('express');
const {
  getBlogPosts,
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogpostController');

const router = express.Router();

router.route('/').get(getBlogPosts).post(createBlogPost);

router
  .route('/:id')
  .get(getBlogPostById)
  .put(updateBlogPost)
  .delete(deleteBlogPost);

module.exports = router;
