const errorMiddleware = (err, req, res) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Server Error';

  // Log errors in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      statusCode,
      message,
      stack: err.stack,
    });
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      status: statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

export default errorMiddleware;
