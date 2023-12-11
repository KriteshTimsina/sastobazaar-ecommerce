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

export const getAllCategories = expressAsyncHandler(async(req:Request,res:Response)=>{
    try {
        const category = await ProductCategory.find({});
        res.status(200).json({
            status:true,
            message:"Categories found",
            category
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
export const editCategory = expressAsyncHandler(async(req:Request,res:Response)=>{})
export const deleteCategory = expressAsyncHandler(async(req:Request,res:Response)=>{})
export const getSingleCategory = expressAsyncHandler(async(req:Request,res:Response)=>{})