import Task from "../models/taskModel";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { deleteText } from "../../components/FsUtil";
import { taskSchema } from "../../components/Validations/Tasks";

// @desc CREATE task
// @route POST /api/tasks
// @access Private:user

const createTask = catchAsyncErrors(async (req, res, next) => {
  const { title, detail } = req.body;

  // validate
  const { error, value } = taskSchema.validate({
    title,
    detail,
  });

  if (error) {
    return next(new ErrorHandler(error.message, 400));
  }

  //create task
  const task = await Task.create({ title, detail, author: req.user._id });

  res.status(200).json({
    status: "success",
    task,
  });
});

// @desc Get tasks
// @route GET /api/tasks
// @access Private:user

const getTasks = catchAsyncErrors(async (req, res, next) => {
  const { search } = req.query;

  let tasks = await Task.find({}).sort({ _id: -1 });
  if (search !== "undefined") {
    tasks = tasks.filter((item) =>
      item.title.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  res.status(200).json({
    status: "success",
    tasks,
  });
});

// @desc GET task
// @route GET /api/tasks/:id
// @access Private:user

const getTask = catchAsyncErrors(async (req, res, next) => {
  const taskId = req.query.id;
  // find task
  const task = await Task.findById({ _id: taskId });

  if (!task) {
    return next(new ErrorHandler("No task found", 404));
  }

  res.status(200).json({
    status: "success",
    task,
  });
});

// @desc Update task
// @route PUT /api/tasks/:id
// @access Private:user

const updateTask = catchAsyncErrors(async (req, res, next) => {
  const taskId = req.query.id;
  const { title, detail } = req.body;

  // find task
  const task = await Task.findById({ _id: taskId });

  if (!task) {
    return next(new ErrorHandler("No task found", 404));
  }

  //   update records that changed
  task.title = title && task.title !== title ? title : task.title;
  task.detail = detail && task.detail !== detail ? detail : task.detail;

  const updatedTask = await task.save();

  res.status(200).json({
    status: "success",
    updatedTask,
  });
});

// @desc delete task
// @route DELETE /tasks/:id
// @access private : user

const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const taskId = req.query.id;
  // find task
  const task = await Task.findById({ _id: taskId });

  if (!task) {
    return next(new ErrorHandler("No task found", 404));
  }

  await task.remove();

  res.status(200).json({
    success: true,
    message: "Successfully Deleted",
  });
});

export { createTask, getTasks, getTask, updateTask, deleteTask };
