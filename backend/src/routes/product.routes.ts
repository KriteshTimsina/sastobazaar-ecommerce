import { Router } from "express";
import { authenticated } from "../middleware/auth";
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
} from "../controllers/product.controller";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.post("", authenticated, isAdmin, upload.single("image"), createProduct);
router.get("", getAllProduct);
router.get("/:id",getSingleProduct);

export default router;
