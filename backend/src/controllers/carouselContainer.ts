import expressAsyncHandler from "express-async-handler";
import { Carousel } from "../models/carouselModel";
import { uploadToCloud } from "../utils/cloudinary";

export const addCarouselImage = expressAsyncHandler(async(req,res)=>{
    try {
        const urls = [];
        const files = req.files;
       for(const file in files){
        const image = await uploadToCloud(files[file].path)
        if(image){
            urls.push(image)
        }
       }

       const carousel = await Carousel.create({
        images: urls
       })
       res.json(carousel)
       
    } catch (error) {
        throw new Error(error)
    }
})