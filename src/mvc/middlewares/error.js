import ErrorHandler from '../utils/errorHandler';

const Errors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let error = { ...err }

    error.message = err.message

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    // Handling mongoose Validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })


}
export default Errors;