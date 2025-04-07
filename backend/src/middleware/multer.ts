import { mkdir, statfs } from "fs/promises";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "../uploads"));
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
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

export const initiateUpload = async () => {
  try {
    console.log(path.resolve());
    await statfs(path.resolve() + "/src/uploads");
  } catch (error) {
    const created = await mkdir(path.resolve() + "/src/uploads");
    console.log(created);
  }
};
