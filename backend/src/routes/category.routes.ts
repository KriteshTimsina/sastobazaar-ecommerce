import { Router } from "express";
import { createCategory,deleteCategory,editCategory,getAllCategories,getSingleCategory } from "../controllers/ProductCategoryController";
import { authenticated } from "../middleware/auth";
import isAdmin from "../middleware/admin";



const router = Router();

router.get("", getAllCategories);
router.get("/:id",authenticated,isAdmin, getSingleCategory);
router.post("",authenticated,isAdmin, createCategory);
router.put("/:id",authenticated,isAdmin, editCategory);
router.delete("/:id",authenticated,isAdmin, deleteCategory);

export default router;
