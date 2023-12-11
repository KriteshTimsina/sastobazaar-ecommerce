import expressAsyncHandler from "express-async-handler";
import { ProductCategory } from "../models/productCategoryModel";
import { Request,Response } from "express";

export const createCategory = expressAsyncHandler(async(req:Request,res:Response)=>{
    try {
        const category  = await ProductCategory.create(req.body);
        if(category){
            res.status(201).json({
                status:true,
                message:"Category created",
                category
            })
        }
    } catch (error:any) {
        throw new Error(error.message)
    }

})