import expressAsyncHandler from "express-async-handler";
import { Request } from "../controllers/user.controller";
import { User } from "../models/userModel";

const isAdmin = expressAsyncHandler(async(req:Request,res,next)=>{
    const {email} = req.user;
    try {
        const user = await User.findOne({email});
        if(user.role === "admin"){
            next();
        }
        else{
            throw new Error("You're not authorized for this operation")
        }
    } catch (error) {
        throw new Error(error)
    }
})

export default isAdmin