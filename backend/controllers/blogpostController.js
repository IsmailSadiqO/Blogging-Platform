const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Blogpost = require('../models/Blogpost');

// @desc        Fetch all blogposts
//@route        GET /api/v1/blogposts
//@access       Public
exports.getBlogPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.resultCustomizationMiddleware);
});

// @desc        Create a blogpost
//@route        POST /api/v1/blogposts
//@access       Private/Admin
exports.createBlogPost = asyncHandler(async (req, res, next) => {
  req.body.author = req.user.id; //Add user to req.body
  const blogpost = await Blogpost.create(req.body);
  res.status(201).json({ success: true, data: blogpost });
});

// @desc        Fetch a single blogpost
//@route        GET /api/v1/blogposts/:id
//@access       Public
exports.getBlogPostById = asyncHandler(async (req, res, next) => {
  const blogpost = await Blogpost.findById(req.params.id);

  if (!blogpost) {
    return next(
      new ErrorResponse(`Blogpost not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: blogpost });
});

// @desc        Update a single blogpost
//@route        PUT /api/v1/blogposts/:id
//@access       Private/Admin
exports.updateBlogPost = asyncHandler(async (req, res, next) => {
  const blogpost = await Blogpost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blogpost) {
    return next(
      new ErrorResponse(`Blogpost not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: blogpost });
});

// @desc        Delete a single blogpost
//@route        DELETE /api/v1/blogposts/:id
//@access       Private/Admin
exports.deleteBlogPost = asyncHandler(async (req, res, next) => {
  const blogpost = await Blogpost.findById(req.params.id);

  if (!blogpost) {
    return next(
      new ErrorResponse(`Blogpost not found with id: ${req.params.id}`, 404)
    );
  }

  blogpost.remove();

  res.status(200).json({ success: true, message: 'BlogPost Deleted' });
});
