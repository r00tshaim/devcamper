const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    // spread operator does not copy non-enumerable properties of object
    // enumerable property => a property that can be viewed if it is iterated using the for loop or Object.keys() method
    error.message = err.message;

    // Log to console for dev
    console.log(err.stack.red);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;