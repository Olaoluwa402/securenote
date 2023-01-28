import User from "../models/userModel";
import Task from "../models/taskModel";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { deleteText } from "../../components/FsUtil";
import { authSchema } from "../../components/Validations/Auth";
import { request } from "http";

// @desc Auth user, get token
// @route POST /api/login
// @access Public

const authUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password, repeat_password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      image: user.image,
      emailIsVerified: user.emailIsVerified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    return next(new ErrorHandler("Invalid email or password", 401));
  }
});

// @desc Register user
// @route POST /api/register
// @access Public

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // validate
  const { error, value } = authSchema.validate({
    email,
    password,
    name,
  });

  if (error) {
    return next(new ErrorHandler(error.message, 400));
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return next(new ErrorHandler("email already exist", 401));
  } else {
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString("hex");

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      emailIsVerified: false,
      emailVerificationToken: token,
    });

    res.status(200).json({
      status: "success",
      user: {
        name: user.name,
        email: user.email,
        emailIsVerified: user.emailIsVerified,
        emailVerificationToken: user.emailVerificationToken,
      },
    });
  }
});

// @desc GET user profile
// @route GET /api/users/profile
// @access Private

const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("Account not found", 404));
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  });
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("Account not found", 404));
  }

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    role: updatedUser.role,
    email: updatedUser.email,
    image: updatedUser.image,

    emailIsVerified: updatedUser.emailIsVerified,
    token: generateToken(updatedUser._id),
  });
});

// @desc get all users
// @route GET /api/users
// @access Admin

const getUsers = catchAsyncErrors(async (req, res) => {
  const usersCount = await User.countDocuments();

  let users = await User.find({}).sort({ _id: -1 });

  res.status(200).json({
    success: true,
    users,
    usersCount,
  });
});

// @desc delete user
// @route DELETE /api/users/:id
// @access Admin

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const deleteId = req.query.id;

  const user = await User.findById(deleteId);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Successfully Deleted",
  });
});

const deleteAccount = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById({ _id: req.user._id });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  //find all associated tasks
  const tasks = await Task.find({
    author: req.user._id,
  });

  //return the ids of the tasks found
  const ids = tasks.map(function (doc) {
    return doc["_id"];
  });

  //bulk delete the docuents
  await Task.deleteMany({ _id: { $in: ids } });

  await User.deleteOne({ _id: req.user._id });

  res.status(200).json({
    success: true,
    message: "Account Removed",
  });
});

// @desc Update user role
// @route PUT /api/users/role
// @access Admin

const changeRole = catchAsyncErrors(async (req, res, next) => {
  const { user_id, role } = req.body;

  const user = await User.findById({ _id: user_id });

  if (!user) {
    return next(new ErrorHandler("Account not found", 404));
  }

  if (role) {
    user.role = role;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    role: updatedUser.role,
    email: updatedUser.email,
    image: updatedUser.image,
    emailIsVerified: updatedUser.emailIsVerified,
    token: generateToken(updatedUser._id),
  });
});

const uploadProfilePicture = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.body;
  const image = req.file && req.file.filename ? req.file.filename : "";

  //find user
  const user = await User.findById({ _id: user_id });

  if (!user) {
    return next(new ErrorHandler("No record found"), 404);
  }

  user.image = image && image !== user.image ? image : user.image;

  //save the updated record
  await user.save();

  res.status(200).json({
    status: "success",
    message: "upload successful",
  });
});

export {
  authUser,
  registerUser,
  getUsers,
  getProfile,
  updateProfile,
  deleteUser,
  changeRole,
  uploadProfilePicture,
  deleteAccount,
};
