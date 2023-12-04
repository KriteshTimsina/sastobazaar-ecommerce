import { Router } from "express";
import { authenticated } from "../middleware/auth";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product.controller";

const router = Router();

router.post("", authenticated, createProduct);
router.get("", authenticated, getAllProduct);

export default router;
