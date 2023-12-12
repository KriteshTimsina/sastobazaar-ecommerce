import { Router } from "express";
import { authenticated } from "../middleware/auth";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
} from "../controllers/product.controller";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.post("", authenticated, isAdmin, upload.single("image"), createProduct);
router.delete("/:id",authenticated,isAdmin,deleteProduct);
router.get("", getAllProduct);
router.get("/:id",getSingleProduct);

export default router;
