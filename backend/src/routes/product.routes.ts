import { Router } from "express";
import { authenticated, optionalAuth } from "../middleware/auth";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct
} from "../controllers/productController";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.get("", optionalAuth, getAllProduct);
router.get("/:slug", getSingleProduct);
router.post("/wishlist", authenticated, addToWishlist);

// admin access only
router.post("", authenticated, isAdmin, upload.array("images", 5), createProduct);
router.delete("/:id", authenticated, isAdmin, deleteProduct);
router.patch("/:id", authenticated, isAdmin, upload.array("images", 5), updateProduct);

export default router;
