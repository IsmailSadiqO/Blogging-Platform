const ErrorResponse = require('../utils/errorResponse');
const Blogpost = require('../models/Blogpost');

// @desc        Fetch all blogposts
//@route        GET /api/v1/blogposts
//@access       Public
exports.getBlogPosts = async (req, res, next) => {
  try {
    const blogposts = await Blogpost.find();
    res
      .status(200)
      .json({ success: true, count: blogposts.length, data: blogposts });
  } catch (error) {
    next(error);
  }
};

// @desc        Create a blogpost
//@route        POST /api/v1/blogposts
//@access       Private/Admin
exports.createBlogPost = async (req, res, next) => {
  try {
    const blogpost = await Blogpost.create(req.body);
    res.status(201).json({ success: true, data: blogpost });
  } catch (error) {
    next(error);
  }
};

// @desc        Fetch a single blogpost
//@route        GET /api/v1/blogposts/:id
//@access       Public
exports.getBlogPostById = async (req, res, next) => {
  try {
    const blogpost = await Blogpost.findById(req.params.id);

    if (!blogpost) {
      return next(
        new ErrorResponse(`Blogpost not found with id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: blogpost });
  } catch (error) {
    next(error);
  }
};

// @desc        Update a single blogpost
//@route        PUT /api/v1/blogposts/:id
//@access       Private/Admin
exports.updateBlogPost = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc        Delete a single blogpost
//@route        DELETE /api/v1/blogposts/:id
//@access       Private/Admin
exports.deleteBlogPost = async (req, res, next) => {
  try {
    const blogpost = await Blogpost.findByIdAndDelete(req.params.id);

    if (!blogpost) {
      return next(
        new ErrorResponse(`Blogpost not found with id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, message: 'BlogPost Deleted' });
  } catch (error) {
    next(error);
  }
};
