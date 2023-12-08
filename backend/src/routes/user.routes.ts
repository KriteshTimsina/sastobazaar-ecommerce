import { Router } from "express";
import {
  deleteAllUser,
  editUser,
  getUserInfo,
  login,
  register,
} from "../controllers/user.controller";
import { authenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticated, getUserInfo);
router.put("/edit", authenticated,upload.single("avatar"), editUser);
router.delete("/delete-all", deleteAllUser);

export default router;
