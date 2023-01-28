import nc from "next-connect";
import dbConnect from "../../../mvc/config/db";
import onError from "../../../mvc/middlewares/error.js";
import { uploadProfilePicture } from "../../../mvc/controllers/userController";
import {
  authorizeUser,
  protect,
} from "../../../mvc/middlewares/authMiddleware";
import { upload } from "../../../components/Multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

let uploadFile = upload.single("image");

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// initiate db
dbConnect();

// route handler middleware
const handler = nc({ onError });

handler
  .use(morgan("dev"), cors(), cookieParser(), protect, uploadFile)
  .put(uploadProfilePicture);

export default handler;
