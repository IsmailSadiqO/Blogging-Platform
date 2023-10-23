const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Blogpost = require('../models/Blogpost');
const Comment = require('../models/Comment');

// @desc        Fetch all comments/ comments for a blogpost
//@route        GET /api/v1/comments
//@route        GET /api/v1/blogposts/:blogpostId/comments
//@access       Public
exports.getComments = asyncHandler(async (req, res, next) => {
  if (req.params.blogpostId) {
    const comments = await Comment.find({
      blogpostId: req.params.blogpostId,
    }).populate({
      path: 'commenter',
      select: 'firstName lastName',
    });

    return res.status(200).json({
      sucess: true,
      count: comments.length,
      data: comments,
    });
  } else {
    res.status(200).json(res.resultCustomizationMiddleware);
  }
});

// @desc        Fetch a single comment
//@route        GET /api/v1/comments/:id
//@access       Public
exports.getCommentById = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate({
    path: 'commenter',
    select: 'firstName lastName',
  });

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id:  ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    sucess: true,
    data: comment,
  });
});

// @desc        Add a comment to a blogpost
//@route        POST /api/v1/blogposts/:blogpostId/comments
//@access       Private
exports.addComment = asyncHandler(async (req, res, next) => {
  req.body.blogpostId = req.params.blogpostId;
  req.body.commenter = req.user.id;

  const blogpost = await Blogpost.findById(req.params.blogpostId);
  if (!blogpost) {
    return next(
      new ErrorResponse(
        `Blogpost not found with id:  ${req.params.blogpostId}`,
        404
      )
    );
  }

  const comment = await Comment.create(req.body);

  res.status(201).json({
    sucess: true,
    data: comment,
  });
});
