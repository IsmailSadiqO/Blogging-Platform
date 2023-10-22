const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc        Register user
//@route        POST /api/v1/auth/register
//@access       Public
exports.registerUser = asyncHandler(async (req, res, next) => {
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
  } else {
    return next(new ErrorResponse(`Invalid user data`, 400));
  }
});

// @desc        Login user & get token
//@route        POST /api/v1/auth/login
//@access       Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password are entered
  if (!email) {
    return next(new ErrorResponse(`Please provide an email`, 400));
  }
  if (!password) {
    return next(new ErrorResponse(`Please provide a password`, 400));
  }

  // Validate email and password are correct
  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    res.status(200).json({
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
  } else {
    return next(new ErrorResponse(`Invalid email or password`, 400));
  }
});

// @desc        Get user profile
//@route        GET /api/v1/auth/me
//@access       Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user) {
    const token = req.cookies.jwt;
    res.status(200).json({
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
  } else {
    return next(new ErrorResponse(`User not found`, 404));
  }
});

// @desc        Update user profile
//@route        PUT /api/v1/auth/updatedetails
//@access       Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      data: {
        userId: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        userName: updatedUser.userName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    return next(new ErrorResponse(`User not found`, 404));
  }
});
