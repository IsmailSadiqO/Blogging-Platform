const express = require('express');
const { getComments } = require('../controllers/commentController');
const Comment = require('../models/Comment');
const resultCustomizationMiddleware = require('../middleware/resultCutomizationMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/').get(getComments);

// router.route('/').get(
//   resultCustomizationMiddleware(Course, {
//     path: 'blogPostId',
//     select: 'title',
//   }),
//   getComments
// );

module.exports = router;
