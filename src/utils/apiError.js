class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '', api_slug = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.error = message;
        if (api_slug) {
            this.api_slug = api_slug;
        }
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;
