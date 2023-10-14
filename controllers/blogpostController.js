// @desc        Fetch all blogposts
//@route        GET /api/v1/blogposts
//@access       Public
exports.getBlogPosts = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Show all blog posts' });
};

// @desc        Create a blogpost
//@route        POST /api/v1/blogposts
//@access       Private/Admin
exports.createBlogPost = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Create a new blog post' });
};

// @desc        Fetch a single blogpost
//@route        GET /api/v1/blogposts/:id
//@access       Public
exports.getBlogPostById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Show blog post ${req.params.id}` });
};

// @desc        Update a single blogpost
//@route        PUT /api/v1/blogposts/:id
//@access       Private/Admin
exports.updateBlogPost = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Update blog post ${req.params.id}` });
};

// @desc        Delete a single blogpost
//@route        DELETE /api/v1/blogposts/:id
//@access       Private/Admin
exports.deleteBlogPost = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete blog post ${req.params.id}` });
};
