import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import { errorHandler, notFound } from "./middleware/error";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

import fs from "fs";
import { upload } from "./middleware/multer";

// const dir = "./uploads";

// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir, { recursive: true });
// }

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/products", productRoutes);

app.use("/test",upload.single("test"),(req,res)=>{
  console.log(req.file)
  console.log(req.body)
 res.send("HI")
})

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
