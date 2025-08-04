// This middleware must have four arguments to be recognized as an error handler by Express.
const errorHandler = (err, req, res, next) => {
    console.error('An error occurred:', err.stack);

    // Respond with a generic 500 server error to avoid leaking implementation details
    res.status(500).json({
        message: 'An internal server error occurred. Please try again later.',
        // Optionally, you could provide the error message in development environment
        // error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
};

module.exports = errorHandler;