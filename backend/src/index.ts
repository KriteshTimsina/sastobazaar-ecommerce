import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import { errorHandler, notFound } from "./middleware/error";
import bodyParser from "body-parser";
import userRouter from "./routes/user.router";
import postRouter from "./routes/post.router";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/post", postRouter);

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
