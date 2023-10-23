const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Blogpost = require('../models/Blogpost');
const Comment = require('../models/Comment');

// @desc        Fetch all comments
//@route        GET /api/v1/comments
//@route        GET /api/v1/blogposts/:blogpostId/comments
//@access       Public
exports.getComments = asyncHandler(async (req, res, next) => {
  // let query;
  // if (req.params.blogpostId) {
  //   query = Comment.find({ blogpostId: req.params.blogpostId });
  // } else {
  //   query = Comment.find().populate({
  //     path: 'commenter',
  //     select: 'firstName lastName',
  //   });
  // }
  // const comments = await query;
  // res
  //   .status(200)
  //   .json({ success: true, count: comments.length, data: comments });

  if (req.params.blogpostId) {
    const comments = await Comment.find({ blogpost: req.params.blogpostId });
    return res.status(200).json({
      sucess: true,
      count: comments.length,
      data: comments,
    });
  } else {
    res.status(200).json(res.resultCustomizationMiddleware);
  }
});
