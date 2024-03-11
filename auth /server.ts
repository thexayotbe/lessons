import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./routes";
import { config } from "dotenv";
const app: Application = express();
// import cookieParser from "cookie-parser";
config();

app.use(cors());
app.use(helmet());
app.use(express.json());
// app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(router);
app.listen(8080, async () => {
  await mongoose.connect("mongodb://localhost:27017/admin");
  console.log("Server is running on port 8080");
});
