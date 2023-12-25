import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import { errorHandler, notFound } from "./middleware/error";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes"
import dynamicContentRoutes from "./routes/dynamicContentRoutes"
import cartRoutes from "./routes/cartRoutes"
import path from "path";


const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./public')));

app.get("/",(req,res)=>{
  // console.log(path.join(__dirname+'./'))
  res.sendFile("public/index.html");
})

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/dynamic-content", dynamicContentRoutes);

//error middlewares
app.use(notFound);
app.use(errorHandler);

//db connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("MONGO DB Connection failed");
  });
