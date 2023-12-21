import { Router } from "express";
import { authenticated } from "../middleware/auth";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.get("", getAllProduct);
router.get("/:id",getSingleProduct);

//admin access only
router.post("", authenticated, isAdmin, upload.array("images",5), createProduct);
router.delete("/:id",authenticated,isAdmin,deleteProduct);
router.patch("/:id",authenticated,isAdmin,upload.array("images",5),updateProduct);


export default router;
