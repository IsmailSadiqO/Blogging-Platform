const express = require('express');
const {
  getComments,
  getCommentById,
  addComment,
} = require('../controllers/commentController');
const Comment = require('../models/Comment');
const resultCustomizationMiddleware = require('../middleware/resultCutomizationMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    resultCustomizationMiddleware(Comment, {
      path: 'commenter',
      select: 'firstName lastName',
    }),
    getComments
  )
  .post(protect, addComment);

router.route('/:id').get(getCommentById);

module.exports = router;
