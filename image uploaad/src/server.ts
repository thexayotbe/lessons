import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import image_router from "./routes";
const app: Application = express();

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
app.use("/image/uploads", express.static("uploads/"));
app.use("/image", image_router);
app.listen(8080, async () => {
  await mongoose.connect(
    "mongodb+srv://mamajonovxayot0:Xayotbek2007@xayotbek.gau92x8.mongodb.net/user"
  );
  console.log("listening  port http://localhost:8080");
});
