import { Router } from "express";
import { deleteAllUser, register } from "../controllers/user.controller";

const router = Router();

router.post("/register", register);
router.delete("/delete-all", deleteAllUser);

export default router;
