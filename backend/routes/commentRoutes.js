const express = require('express');
const { getComments } = require('../controllers/commentController');
const Comment = require('../models/Comment');
const resultCustomizationMiddleware = require('../middleware/resultCutomizationMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/').get(
  resultCustomizationMiddleware(Comment, {
    path: 'commenter',
    select: 'firstName lastName',
  }),
  getComments
);

module.exports = router;
