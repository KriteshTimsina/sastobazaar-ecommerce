import { Router } from "express";
import {
  deleteAllUser,
  getUserInfo,
  login,
  register,
} from "../controllers/user.controller";
import { authenticated } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticated, getUserInfo);
router.delete("/delete-all", deleteAllUser);

export default router;
