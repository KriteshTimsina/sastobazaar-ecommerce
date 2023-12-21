import { Router } from "express";
import {
  blockUser,
  changePassword,
  deleteAllUser,
  editUser,
  getAllUsers,
  getUserInfo,
  getUserWishlists,
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
router.get("/wishlist", authenticated,getUserWishlists);

router.put("/block/:id", authenticated, isAdmin, blockUser);
router.put("/unblock/:id", authenticated, isAdmin, unblockUser);
router.get("/",authenticated,isAdmin, getAllUsers);
router.delete("/delete-all",authenticated,isAdmin, deleteAllUser);
router.put("/change-password",authenticated, changePassword);

export default router;
