import multer from "multer";
import path from "path";
// import type { NextApiRequest, NextApiResponse } from 'next'

// form data with file upload
let storage = multer.diskStorage({
  destination: function (req: any, file: Express.Multer.File, cb) {
    cb(null, "public");
  },
  filename: function (req, file: Express.Multer.File, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function checkFileType(file: Express.Multer.File, cb: any) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images of type jpeg, jpg and png Only!");
  }
}

let upload = multer({
  storage: storage,
  limits: { fileSize: 400000 }, //400kilobyte
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export { upload };
