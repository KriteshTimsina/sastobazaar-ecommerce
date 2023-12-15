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

       const product = await Product.findById(productId).select("-description -category -subCategory -createdAt -updatedAt");

       if(!product) throw new Error("Product not found. ")

       const totalAmount = Number(product.price) * Number(quantity)

       const cartItem = await Cart.create({
         products: [
           {
             product,
             quantity,
           },
         ],
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