import { Router } from "express";
import { addCarouselImage, getAllCarousels } from "../controllers/dynamicContentController";
import { authenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.post("/carousel",authenticated,isAdmin,upload.array("images"), addCarouselImage);
router.get("/carousel",getAllCarousels);


export default router;
