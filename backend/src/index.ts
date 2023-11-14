import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import todoRouter from "./routes/todo.route";
import { errorHandler, notFound } from "./middleware/error";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { v4 as uuid } from "uuid";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.cookies.sessionId) {
    res.cookie("sessionId", uuid(), { secure: false });
  }
  next();
});

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
