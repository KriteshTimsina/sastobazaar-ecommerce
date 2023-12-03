import { Router } from "express";
import { deleteAllUser, login, register } from "../controllers/user.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete-all", deleteAllUser);

export default router;
