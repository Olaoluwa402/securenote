import nc from "next-connect";
import dbConnect from "../../../mvc/config/db";
import onError from "../../../mvc/middlewares/error.js";
import { changeRole } from "../../../mvc/controllers/userController";
import {
  authorizeUser,
  protect,
} from "../../../mvc/middlewares/authMiddleware";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// initiate db
dbConnect();

// route handler middleware
const handler = nc({ onError });

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, authorizeUser(["admin"]))
  .put(changeRole);

export default handler;
