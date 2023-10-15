const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Blogpost = require('../models/Blogpost');

// @desc        Fetch all blogposts
//@route        GET /api/v1/blogposts
//@access       Public
exports.getBlogPosts = asyncHandler(async (req, res, next) => {
  let query;

  // Copy of req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Searching DB
  query = Blogpost.find(reqQuery);

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Blogpost.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Execute Query
  const blogposts = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      // limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      // limit,
    };
  }

  res.status(200).json({
    success: true,
    count: blogposts.length,
    pagination,
    pageLimit: limit,
    data: blogposts,
  });
});

// @desc        Create a blogpost
//@route        POST /api/v1/blogposts
//@access       Private/Admin
exports.createBlogPost = asyncHandler(async (req, res, next) => {
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
  const blogpost = await Blogpost.findByIdAndDelete(req.params.id);

  if (!blogpost) {
    return next(
      new ErrorResponse(`Blogpost not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, message: 'BlogPost Deleted' });
});
