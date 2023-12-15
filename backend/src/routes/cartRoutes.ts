import { Router } from "express";
import { authenticated } from "../middleware/auth";
import { addProductToCart } from "../controllers/cartController";

const router = Router()

router.post("/:productId",authenticated,addProductToCart)

export default router