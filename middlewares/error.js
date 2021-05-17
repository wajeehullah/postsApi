//const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err }; // equals to new Object
    console.log(err.message);
    error.message = err.message;
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Internal Server Error"
    })
}

module.exports = errorHandler;