import nc from "next-connect";
import dbConnect from "../../../../mvc/config/db";
import onError from "../../../../mvc/middlewares/error.js";
import {
  getTask,
  updateTask,
  deleteTask,
} from "../../../../mvc/controllers/taskController";
import {
  authorizeUser,
  protect,
} from "../../../../mvc/middlewares/authMiddleware";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// initiate db
dbConnect();

// route handler middleware
const handler = nc({ onError });

handler.use(morgan("dev"), cors(), cookieParser(), protect).get(getTask);
handler.use(morgan("dev"), cors(), cookieParser(), protect).put(updateTask);
handler.use(morgan("dev"), cors(), cookieParser(), protect).delete(deleteTask);

export default handler;
