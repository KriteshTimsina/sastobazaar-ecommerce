import expressAsyncHandler from "express-async-handler";
import { Carousel } from "../models/carouselModel";
import { uploadToCloud } from "../utils/cloudinary";
import { rmSync } from "fs";

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
        images:urls,
       })
       res.json(carousel)
       
    } catch (error) {
        throw new Error(error)
    }
})

export const getAllCarousels = expressAsyncHandler(async(req,res)=>{
    try {
        const images = await Carousel.find().select("images").select("images")
        const flattenedImagesArray = images.flatMap(image => image.images)
        res.json({status:true,images:flattenedImagesArray})
    } catch (error) {
        throw new Error(error)
    }
})