import ErrorHandler from "../util/errorHandler.js";

export const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return next(new ErrorHandler("You are not authorized to access this route", 401));
    }
}