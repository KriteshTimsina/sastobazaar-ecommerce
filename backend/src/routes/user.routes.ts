import { Router } from "express";
import {
  deleteAllUser,
  getUserInfo,
  login,
  register,
} from "../controllers/user.controller";
import { authenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/me", authenticated, getUserInfo);
router.delete("/delete-all", deleteAllUser);

export default router;
