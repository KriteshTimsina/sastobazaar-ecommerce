import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity:{
          type:Number,
          default:1
        }
      },
    ],
    totalAmount:{
        type:Number,
        default:0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
      }
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
