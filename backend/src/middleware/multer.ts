import { fstat, mkdirSync, statSync } from "fs";
import { mkdir, stat, statfs } from "fs/promises";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    console.log(res, "UPLOAD");
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage,
  fileFilter
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // }
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null,  'uploads/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// export const upload = multer({ storage: storage })

export const createUploadFolder = async () => {
  try {
    const exists = await statfs(path.resolve() + "/uploads");

    console.log(exists);
    // console.log(exists, "JAJA");
    // if (!exists) {
    // }
    // console.log(path.resolve());
  } catch (error) {
    const created = await mkdir(path.resolve() + "/uploads");
    console.log(created);
  }
};
