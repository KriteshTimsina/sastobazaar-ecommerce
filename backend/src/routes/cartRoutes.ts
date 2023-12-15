import { Router } from "express";
import { authenticated } from "../middleware/auth";
import { addProductToCart, getAllCart } from "../controllers/cartController";

const router = Router()

router.post("/:productId",authenticated,addProductToCart)
router.get("",authenticated,getAllCart)

export default router