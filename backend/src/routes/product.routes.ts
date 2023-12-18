import { Router } from "express";
import { authenticated } from "../middleware/auth";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.get("", getAllProduct);
router.get("/:id",getSingleProduct);

//admin access only
router.post("", authenticated, isAdmin, upload.array("images",5), createProduct);
router.delete("/:id",authenticated,isAdmin,deleteProduct);
router.patch("/:id",authenticated,isAdmin,updateProduct);


export default router;
