import { Router } from "express";
import { createCategory } from "../controllers/ProductCategoryController";
import { authenticated } from "../middleware/auth";
import isAdmin from "../middleware/admin";



const router = Router();

router.post("",authenticated,isAdmin, createCategory);

export default router;
