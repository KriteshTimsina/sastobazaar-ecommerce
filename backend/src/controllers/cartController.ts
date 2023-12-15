import { Product } from "../models/productModel";
import { Cart } from "../models/cartModel";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import { Request } from "./user.controller";

export const addProductToCart = expressAsyncHandler(async(req:Request,res)=>{
    const {productId} = req.params;
    const {quantity} = req.body;
    try {
       const user = await User.findById({_id:req.user._id}) ;
       if(!user) throw new Error("Unauthenticated. Login again")

       const product = await Product.findById(productId)

       if(!product) throw new Error("Product not found. ")

       const totalAmount = Number(product.price) * Number(quantity)

       const cartItem = await Cart.create({
        products:{
            product:product._id,
            quantity
        },
         totalAmount,
         userId: user._id,
       });

       if(!cartItem) throw new Error("Failed to add to cart")

       res.json({status:true,message:"Added to cart",cartItem})
       console.log(product,quantity)
    } catch (error) {
        throw new Error(error)
    }
})

export const getAllCart = expressAsyncHandler(async(req:Request,res)=>{
    try {
        const user = await User.findById({_id:req.user._id})
        if(!user) throw new Error("Unauthenticated. Login again")
        const carts = await Cart.find({userId:user._id}).populate("products.product")
        if(!carts ) throw new Error("Error getting cart")
        if(carts.length===0) res.json({status:true,message:"Cart is empty"})
        res.json({status:true,message:'Found cart',carts})
    } catch (error) {
        throw new  Error(error)
    }
})