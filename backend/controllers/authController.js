const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc        Register user
//@route        POST /api/v1/auth/register
//@access       Public
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  const userNameExists = await User.findOne({ userName });
  if (emailExists) {
    return next(
      new ErrorResponse(
        `Entered email is already in use: ${req.body.email}`,
        400
      )
    );
  }
  if (userNameExists) {
    return next(
      new ErrorResponse(
        `Entered username is already in use: ${req.body.userName}`,
        400
      )
    );
  }

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password,
  });

  // Create token
  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      success: true,
      data: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      },
    });
  }
});
