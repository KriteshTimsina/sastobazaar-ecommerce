import { Router } from "express";
import { authenticated } from "../middleware/auth";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.post("", authenticated, isAdmin, upload.single("image"), createProduct);
router.get("", authenticated, getAllProduct);

export default router;
