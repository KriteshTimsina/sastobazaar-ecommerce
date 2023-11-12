import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import todoRouter from "./routes/todo.route";
import { errorHandler, notFound } from "./middleware/error";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", todoRouter);

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("MONGO DB Connection failed");
  });
