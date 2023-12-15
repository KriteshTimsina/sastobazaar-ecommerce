import { Router } from "express";
import { addCarouselImage } from "../controllers/carouselContainer";
import { authenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";
import isAdmin from "../middleware/admin";

const router = Router();

router.post("/",authenticated,isAdmin,upload.array("images"), addCarouselImage);


export default router;
