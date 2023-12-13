import { Router } from "express";
import {
  blockUser,
  deleteAllUser,
  editUser,
  getAllUsers,
  getUserInfo,
  login,
  register,
  unblockUser,
} from "../controllers/user.controller";
import { authenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticated, getUserInfo);
router.put("/edit", authenticated, upload.single("avatar"), editUser);

router.put("/block/:id", authenticated, isAdmin, blockUser);
router.put("/unblock/:id", authenticated, isAdmin, unblockUser);
router.get("/",authenticated,isAdmin, getAllUsers);
router.delete("/delete-all",authenticated,isAdmin, deleteAllUser);

export default router;
