const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //Check for Mongoose CastError
  if (err.name === 'CastError') {
    const message = `Invalid Blogpost id: ${err.value} `;
    error = new ErrorResponse(message, 400);
  }

  //   //Check for Mongoose Error
  //   if (err.name === 'Error') {
  //     const message = `Blogpost not found with id: ${err.value} `;
  //     error = new ErrorResponse(message, 404);
  //   }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

// const notFound = (err, req, res, next) => {
//   res.status(err.statusCode || 500).json({
//     success: true,
//     message: err.message || 'Server Error',
//   });
// };

// module.exports = { errorHandler, notFound };
module.exports = errorHandler;
