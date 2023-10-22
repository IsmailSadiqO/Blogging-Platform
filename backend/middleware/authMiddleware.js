const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
      next();
    } catch (error) {
      console.log(error);
      return next(new ErrorResponse(`Not authorized, token failed`, 401));
      // res.status(401);
      // new ErrorResponse('Not authorized, token failed');
    }
  } else {
    return next(new ErrorResponse(`Not authorized, no token`, 401));
    // res.status(401);
    // new ErrorResponse('Not authorized, no token');
  }
});

// Admin middleware
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new ErrorResponse(`Not authorized as admin`, 401));
    // res.status(401);
    // throw new Error('Not authorized as admin');
  }
};

// module.exports = { protect, admin };
