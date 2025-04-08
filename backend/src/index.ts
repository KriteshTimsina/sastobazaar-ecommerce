import "dotenv/config";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db";
import { errorHandler, notFound } from "./middleware/error";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import dynamicContentRoutes from "./routes/dynamicContentRoutes";
import cartRoutes from "./routes/cartRoutes";
import path from "path";
import { PORT } from "./utils/env";

const app = express();

// middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.get("/", (_, res) => {
  res.json({
    status: true,
    message: "Healthy"
  });
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/dynamic-content", dynamicContentRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🖥️ Server starting at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("MONGO DB Connection failed");
  });
