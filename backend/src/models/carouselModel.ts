import mongoose,{Schema} from "mongoose";

const carouselSchema = new Schema({
    images:{
       type:[],
       required:true
    },
    
},{timestamps:true})

export const Carousel = mongoose.model("Carousel",carouselSchema)