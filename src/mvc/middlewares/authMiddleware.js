import dotenv from "dotenv";
// cofig connection
dotenv.config();
import JWT from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";

const protect = catchAsyncErrors(async (req, res, next) => {
  console.log(req.headers, "reqHeader");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      const user = await User.findById({ _id: decoded.id });

      req.user = user;
      next();
    } catch (err) {
      console.log(err.message);
      return next(new ErrorHandler(`${err.message}`, 401));
    }
  }

  if (!token) {
    return next(new ErrorHandler("No token, Unauthorized!", 401));
  }
});

//user role authorization

const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          401
        )
      );
    }

    next();
  };
};

export { protect, authorizeUser };
