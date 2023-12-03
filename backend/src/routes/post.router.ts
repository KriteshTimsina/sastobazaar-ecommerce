import { Router } from "express";
import { authenticated } from "../middleware/auth";
import { createPost, getAllPost } from "../controllers/post.controller";

const router = Router();

router.post("", authenticated, createPost);
router.get("", authenticated, getAllPost);

export default router;
