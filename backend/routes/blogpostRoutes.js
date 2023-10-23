const express = require('express');
const {
  getBlogPosts,
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogpostController');
const Blogpost = require('../models/Blogpost');
const User = require('../models/User');
const resultCustomizationMiddleware = require('../middleware/resultCutomizationMiddleware');

// Include other resource routers
const commentRouter = require('./commentRoutes');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Re-route into other resource routers
router.use('/:blogpostId/comments', commentRouter);

router
  .route('/')
  .get(
    // resultCustomizationMiddleware(Blogpost, {
    //   path: 'comments',
    //   select: 'commenter comment -blogpostId',
    // }),
    resultCustomizationMiddleware(
      Blogpost,
      {
        path: 'comments',
        select: 'commenter comment -blogpostId',
      },
      {
        path: 'author',
        select: 'firstName lastName',
      }
    ),
    getBlogPosts
  )
  .post(protect, admin, createBlogPost);

router
  .route('/:id')
  .get(getBlogPostById)
  .put(protect, admin, updateBlogPost)
  .delete(protect, admin, deleteBlogPost);

module.exports = router;
