import { Router } from "express";
import { authenticated } from "../middleware/auth";
import { createPost } from "../controllers/post.controller";

const router = Router();

router.post("", authenticated, createPost);

export default router;
