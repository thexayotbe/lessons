import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import router from "./routs";
const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(router);
app.listen(8080, async () => {
  await mongoose.connect("mongodb://localhost:27017/admin");

  console.log("Listening on port http://localhost:8080");
});
